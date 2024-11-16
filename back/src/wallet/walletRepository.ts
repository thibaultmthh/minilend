import { Collection } from 'mongodb'

import { getCollection } from '@/services/mongoService'


const WALLET_COLLECTION = 'wallet'

const _getWalletCollection = (): Collection<WalletType> => {
  return getCollection<WalletType>(WALLET_COLLECTION)
}

const _getWalletCollectionForInsert = (): Collection<WalletType> => {
  return getCollection<WalletType>(WALLET_COLLECTION)
}

const createOrUpdateWallet = async (
  address: string,
  approvedAmount: number
): Promise<WalletType | null> => {
  const wallet = (
    await _getWalletCollectionForInsert().findOneAndUpdate(
      {
        address
      },
      {
        $set: {
          approvedAmount: approvedAmount
        }
      },
      {
        returnDocument: 'after',
        upsert: true
      }
    )
  ).value
  return wallet
}

const getWallet = async (address: string): Promise<WalletType | null> => {
  const wallet = await _getWalletCollection().findOne({
    address
  })
  return wallet
}

export default {
  createOrUpdateWallet,
  getWallet,
  WALLET_COLLECTION
}
