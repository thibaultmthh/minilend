import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { reset, time } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Disperser, MockERC20 } from '../typechain-types';

describe('Disperser', () => {
  let disperser: Disperser;
  let mockToken: MockERC20;
  let owner: HardhatEthersSigner;
  let addresses: HardhatEthersSigner[];
  let futureTimestamp: number;

  beforeEach(async () => {
    await reset();
    [owner, ...addresses] = await ethers.getSigners();

    const DisperserFactory = await ethers.getContractFactory('Disperser');
    disperser = await DisperserFactory.deploy() as Disperser;

    const MockERC20Factory = await ethers.getContractFactory('MockERC20');
    mockToken = await MockERC20Factory.deploy('Mock Token', 'MTK') as MockERC20;

    futureTimestamp = await time.latest() + 3600; // 1 hour in the future
  });

  describe('Scheduling Airdrops', () => {
    it('should schedule an ETH airdrop with equal amounts', async () => {
      const recipients = addresses.slice(0, 3).map(addr => addr.address);
      const equalValue = ethers.parseEther('1');
      const totalAmount = equalValue * BigInt(recipients.length);

      await expect(
        disperser.scheduleAirdrop(
          recipients,
          [],
          ethers.ZeroAddress,
          true,
          true,
          equalValue,
          futureTimestamp,
          { value: totalAmount }
        )
      ).to.emit(disperser, 'AirdropScheduled');
    });

    it('should schedule an ERC20 airdrop with varying amounts', async () => {
      const recipients = addresses.slice(0, 3).map(addr => addr.address);
      const values = [
        ethers.parseEther('1'),
        ethers.parseEther('2'),
        ethers.parseEther('3')
      ];
      const totalAmount = values.reduce((a, b) => a + b, 0n);

      await mockToken.mint(owner.address, totalAmount);
      await mockToken.approve(await disperser.target, totalAmount);

      await expect(
        disperser.scheduleAirdrop(
          recipients,
          values,
          await mockToken.target,
          false,
          false,
          0,
          futureTimestamp
        )
      ).to.emit(disperser, 'AirdropScheduled');
    });

    it('should revert when scheduling airdrop with past date', async () => {
      const recipients = addresses.slice(0, 3).map(addr => addr.address);
      const pastDate = await time.latest() - 3600;

      await expect(
        disperser.scheduleAirdrop(
          recipients,
          [],
          ethers.ZeroAddress,
          true,
          true,
          ethers.parseEther('1'),
          pastDate,
          { value: ethers.parseEther('3') }
        )
      ).to.be.revertedWith('Airdrop date must be in the future');
    });

    it('should revert when insufficient ETH is provided', async () => {
      const recipients = addresses.slice(0, 3).map(addr => addr.address);
      const equalValue = ethers.parseEther('1');

      await expect(
        disperser.scheduleAirdrop(
          recipients,
          [],
          ethers.ZeroAddress,
          true,
          true,
          equalValue,
          futureTimestamp,
          { value: ethers.parseEther('2') } // Insufficient for 3 recipients
        )
      ).to.be.revertedWith('Insufficient Ether provided');
    });
  });

  describe('Executing Airdrops', () => {
    it('should execute ETH airdrop with equal amounts', async () => {
      const recipients = addresses.slice(0, 3).map(addr => addr.address);
      const equalValue = ethers.parseEther('1');
      const totalAmount = equalValue * BigInt(recipients.length);

      await disperser.scheduleAirdrop(
        recipients,
        [],
        ethers.ZeroAddress,
        true,
        true,
        equalValue,
        futureTimestamp,
        { value: totalAmount }
      );

      await time.increase(3601);

      const initialBalances = await Promise.all(
        recipients.map(recipient => ethers.provider.getBalance(recipient))
      );

      await expect(disperser.executeAirdrop(0, 3))
        .to.emit(disperser, 'AirdropExecutionCompleted');

      for (let i = 0; i < recipients.length; i++) {
        const finalBalance = await ethers.provider.getBalance(recipients[i]);
        expect(finalBalance - initialBalances[i]).to.equal(equalValue);
      }
    });

    it('should execute ERC20 airdrop with varying amounts', async () => {
      const recipients = addresses.slice(0, 3).map(addr => addr.address);
      const values = [
        ethers.parseEther('1'),
        ethers.parseEther('2'),
        ethers.parseEther('3')
      ];
      const totalAmount = values.reduce((a, b) => a + b, 0n);

      await mockToken.mint(owner.address, totalAmount);
      await mockToken.approve(await disperser.target, totalAmount);

      await disperser.scheduleAirdrop(
        recipients,
        values,
        await mockToken.target,
        false,
        false,
        0,
        futureTimestamp
      );

      await time.increase(3601);

      await expect(disperser.executeAirdrop(0, 3))
        .to.emit(disperser, 'AirdropExecutionCompleted');

      for (let i = 0; i < recipients.length; i++) {
        expect(await mockToken.balanceOf(recipients[i])).to.equal(values[i]);
      }
    });

    it('should revert when executing before airdrop date', async () => {
      const recipients = addresses.slice(0, 3).map(addr => addr.address);
      const equalValue = ethers.parseEther('1');

      await disperser.scheduleAirdrop(
        recipients,
        [],
        ethers.ZeroAddress,
        true,
        true,
        equalValue,
        futureTimestamp,
        { value: ethers.parseEther('3') }
      );

      await expect(disperser.executeAirdrop(0, 3))
        .to.be.revertedWith('Airdrop date has not reached');
    });

    it('should revert when executing non-existent airdrop', async () => {
      await expect(disperser.executeAirdrop(999, 3))
        .to.be.revertedWith('Airdrop not scheduled');
    });

    it('should handle batch processing correctly', async () => {
      const recipients = addresses.slice(0, 5).map(addr => addr.address);
      const equalValue = ethers.parseEther('1');
      const totalAmount = equalValue * BigInt(recipients.length);

      await disperser.scheduleAirdrop(
        recipients,
        [],
        ethers.ZeroAddress,
        true,
        true,
        equalValue,
        futureTimestamp,
        { value: totalAmount }
      );

      await time.increase(3601);

      // Execute in batches of 2
      await disperser.executeAirdrop(0, 2);

      // Should revert on subsequent execution attempts
      await expect(disperser.executeAirdrop(0, 2))
        .to.be.revertedWith('Airdrop already executed');

      for (const recipient of recipients.slice(0, 2)) {
        expect(await ethers.provider.getBalance(recipient))
          .to.be.greaterThan(0);
      }
    });
  });

  describe('Gas Usage', () => {
    it('should process airdrops efficiently within gas limits', async () => {
      const recipients = addresses.slice(0, 10).map(addr => addr.address);
      const equalValue = ethers.parseEther('0.1');
      const totalAmount = equalValue * BigInt(recipients.length);

      await disperser.scheduleAirdrop(
        recipients,
        [],
        ethers.ZeroAddress,
        true,
        true,
        equalValue,
        futureTimestamp,
        { value: totalAmount }
      );

      await time.increase(3601);

      const tx = await disperser.executeAirdrop(0, 5);
      const receipt = await tx.wait();
      
      expect(receipt?.gasUsed).to.be.lessThan(3000000);
    });
  }); 
  // Add this new describe block after your existing tests
describe('Reentrancy Protection', () => {
  let attacker: Contract;

  beforeEach(async () => {
    const AttackerFactory = await ethers.getContractFactory('ReentrancyAttacker');
    attacker = await AttackerFactory.deploy(await disperser.target);
  });

  it('should prevent reentrancy in ETH airdrops', async () => {
    // Setup airdrop with attacker as recipient
    const equalValue = ethers.parseEther('1');
    
    await disperser.scheduleAirdrop(
      [await attacker.target],
      [],
      ethers.ZeroAddress,
      true,
      true,
      equalValue,
      futureTimestamp,
      { value: equalValue }
    );

    await time.increase(3601);

    const initialBalance = await ethers.provider.getBalance(await attacker.target);
    
    // Attempt reentrancy attack
    await expect(
      attacker.attack(0, 1)
    ).to.be.revertedWith('Airdrop already executed');

    const finalBalance = await ethers.provider.getBalance(await attacker.target);
    expect(finalBalance - initialBalance).to.equal(equalValue);
    expect(await attacker.attackCount()).to.equal(1);
  });

  it('should prevent reentrancy in batch processing', async () => {
    // Setup airdrop with multiple recipients including attacker
    const recipients = [
      await attacker.target,
      addresses[1].address,
      await attacker.target
    ];
    const equalValue = ethers.parseEther('1');
    const totalAmount = equalValue * BigInt(recipients.length);

    await disperser.scheduleAirdrop(
      recipients,
      [],
      ethers.ZeroAddress,
      true,
      true,
      equalValue,
      futureTimestamp,
      { value: totalAmount }
    );

    await time.increase(3601);

    const initialBalance = await ethers.provider.getBalance(await attacker.target);
    
    // Attempt batch processing attack
    await expect(
      disperser.executeAirdrop(0, 2)
    ).to.emit(disperser, 'AirdropExecutionCompleted');

    const finalBalance = await ethers.provider.getBalance(await attacker.target);
    expect(finalBalance - initialBalance).to.equal(equalValue);
  });

  it('should prevent cross-function reentrancy', async () => {
    // Setup two airdrops
    const equalValue = ethers.parseEther('1');
    
    // First airdrop
    await disperser.scheduleAirdrop(
      [await attacker.target],
      [],
      ethers.ZeroAddress,
      true,
      true,
      equalValue,
      futureTimestamp,
      { value: equalValue }
    );

    // Second airdrop
    await disperser.scheduleAirdrop(
      [await attacker.target],
      [],
      ethers.ZeroAddress,
      true,
      true,
      equalValue,
      futureTimestamp,
      { value: equalValue }
    );

    await time.increase(3601);

    // Attempt cross-function reentrancy
    await expect(
      attacker.attack(0, 1)
    ).to.be.revertedWith('Airdrop already executed');

    // Verify only one airdrop was executed
    const balance = await ethers.provider.getBalance(await attacker.target);
    expect(balance).to.equal(equalValue);
  });

  it('should prevent reentrancy during failed transfers', async () => {
    const equalValue = ethers.parseEther('1');
    
    // Create airdrop with zero-address recipient to force failure
    await disperser.scheduleAirdrop(
      [ethers.ZeroAddress, await attacker.target],
      [],
      ethers.ZeroAddress,
      true,
      true,
      equalValue,
      futureTimestamp,
      { value: equalValue * 2n }
    );

    await time.increase(3601);

    // Attempt attack during failed transfer
    await expect(
      disperser.executeAirdrop(0, 2)
    ).to.be.revertedWith('Recipient address cannot be zero');

    // Verify no transfers occurred
    const balance = await ethers.provider.getBalance(await attacker.target);
    expect(balance).to.equal(0);
  });

  it('should prevent reentrancy with multiple attackers', async () => {
    // Deploy second attacker
    const attacker2 = await (await ethers.getContractFactory('ReentrancyAttacker'))
      .deploy(await disperser.target);

    const equalValue = ethers.parseEther('1');
    const totalAmount = equalValue * 2n;

    await disperser.scheduleAirdrop(
      [await attacker.target, await attacker2.target],
      [],
      ethers.ZeroAddress,
      true,
      true,
      equalValue,
      futureTimestamp,
      { value: totalAmount }
    );

    await time.increase(3601);

    // Both attackers attempt reentrancy
    await expect(
      disperser.executeAirdrop(0, 2)
    ).to.emit(disperser, 'AirdropExecutionCompleted');

    // Verify each attacker only received one payment
    expect(await ethers.provider.getBalance(await attacker.target)).to.equal(equalValue);
    expect(await ethers.provider.getBalance(await attacker2.target)).to.equal(equalValue);
  });
});
});


