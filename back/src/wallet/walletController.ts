import express from 'express'

import walletService from './walletService'

const createWallet = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { address, approvedAmount } = req.body

  await walletService.createOrUpdateWalletInDB(address, approvedAmount)

  res.status(200).json({ success: true })
}

export default {
  createWallet
}
