import walletRepository from './walletRepository'
import { Wallet } from './walletTypes'

const createOrUpdateWalletInDB = async (
  address: string,
  approvedAmount: number
): Promise<Wallet | null> => {
  return await walletRepository.createOrUpdateWallet(address, approvedAmount)
}

export default {
  createOrUpdateWalletInDB
}
