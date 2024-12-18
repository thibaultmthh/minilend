import express, { Application, Request, Response, NextFunction } from 'express';
import { ethers } from 'ethers';
import cron from 'node-cron';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the backend API fdp!' });
});

// Temporary storage for DCA orders and cron jobs
const dcaOrders: { walletAddress: string; dayOfMonth: number; amount: string }[] = [];
const cronJobs: { walletAddress: string; job: cron.ScheduledTask }[] = [];
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const privateKey = process.env.DCA_PRIVATE_KEY as string;
const signer = new ethers.Wallet(privateKey, provider);

// Smart contract details
const contractAddress = process.env.CONTRACT_ADDRESS as string;
const contractABI = [
  "function stakeUSDCOnBehalf(address beneficiary, uint256 amount) external"
];
const dcaContract = new ethers.Contract(contractAddress, contractABI, signer);

function createCronJob(walletAddress: string, dayOfMonth: number, amount: string) {
  const cronExpression = '* * * * *';

  const job = cron.schedule(cronExpression, async () => {
    try {
      console.log(`Executing DCA order for wallet: ${walletAddress} on day ${dayOfMonth}`);

      // Parse the amount to ensure correct precision
      const usdcAmount = ethers.parseUnits(amount, 18); // Amount is provided as a string
      console.log(`Staking ${usdcAmount} USDC on behalf of ${walletAddress}`);
      const stakeTx = await dcaContract.stakeUSDCOnBehalf(walletAddress, usdcAmount);
      await stakeTx.wait();
      console.log(`Stake successful: ${stakeTx.hash}`);
    } catch (error) {
      console.error(`Error executing DCA for ${walletAddress}:`, error);
    }
  });

  job.start();
  cronJobs.push({ walletAddress, job });
  console.log(`Cron job created for wallet: ${walletAddress} on day ${dayOfMonth}`);
}

function removeCronJob(walletAddress: string) {
  const jobIndex = cronJobs.findIndex((cronJob) => cronJob.walletAddress === walletAddress);

  if (jobIndex !== -1) {
    const { job } = cronJobs[jobIndex];
    job.stop(); // Stop the job
    cronJobs.splice(jobIndex, 1); // Remove it from the list
    console.log(`Cron job removed for wallet: ${walletAddress}`);
  }
}

// Subscribe endpoint
app.post(
  '/subscribe',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { signature, walletAddress, dayOfMonth, amount } = req.body;

    if (!signature || !walletAddress || dayOfMonth == null || !amount) {
      res.status(400).json({ message: 'Signature, wallet address, day of month, and amount are required.' });
      return;
    }

    if (typeof dayOfMonth !== 'number' || dayOfMonth < 1 || dayOfMonth > 31) {
      res.status(400).json({ message: 'Invalid day of the month. Must be between 1 and 31.' });
      return;
    }

    try {
      const message = 'Sign this message to subscribe to DCA orders.';
      const recoveredAddress = ethers.verifyMessage(message, signature);

      if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        res.status(400).json({ message: 'Invalid signature.' });
        return;
      }

      // Save the DCA order with the custom amount
      dcaOrders.push({ walletAddress, dayOfMonth, amount });
      console.log('DCA order registered:', { walletAddress, dayOfMonth, amount });
      createCronJob(walletAddress, dayOfMonth, amount);

      res.status(200).json({
        message: 'DCA order successfully registered.',
        order: { walletAddress, dayOfMonth, amount },
      });
    } catch (error) {
      console.error('Error registering DCA order:', error);
      next(error); // Pass the error to the next middleware
    }
  }
);

// Unsubscribe endpoint
app.post(
  '/unsubscribe',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { signature, walletAddress } = req.body;

    if (!signature || !walletAddress) {
      res.status(400).json({ message: 'Signature and wallet address are required.' });
      return;
    }

    try {
      const message = 'Sign this message to unsubscribe from DCA orders.';
      const recoveredAddress = ethers.verifyMessage(message, signature);

      if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        res.status(400).json({ message: 'Invalid signature.' });
        return;
      }

      const orderIndex = dcaOrders.findIndex((order) => order.walletAddress === walletAddress);

      if (orderIndex !== -1) {
        dcaOrders.splice(orderIndex, 1);
        console.log(`DCA order removed for wallet: ${walletAddress}`);
      } else {
        res.status(404).json({ message: 'DCA order not found.' });
        return;
      }

      removeCronJob(walletAddress);

      res.status(200).json({ message: 'Successfully unsubscribed from DCA orders.' });
    } catch (error) {
      console.error('Error unsubscribing from DCA order:', error);
      next(error);
    }
  }
);

// Endpoint: Get Subscription
app.post(
  '/subscription',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      res.status(400).json({ message: 'Wallet address is required.' });
      return;
    }

    try {
      const order = dcaOrders.find((order) => order.walletAddress === walletAddress);

      if (!order) {
        res.status(404).json({ message: 'No subscription found for this wallet.' });
        return;
      }

      res.status(200).json({ message: 'Subscription found.', subscription: order });
    } catch (error) {
      console.error('Error fetching subscription:', error);
      next(error);
    }
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
