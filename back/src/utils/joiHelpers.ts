import { ethers } from 'ethers'
import { BadRequest } from 'http-errors'
import Joi from 'joi'

const joiAsAddress = (): Joi.Schema => {
  return Joi.string().custom((walletAddress) => {
    if (!ethers.utils.isAddress(walletAddress)) {
      throw BadRequest('Invalid user address')
    } else {
      return true
    }
  })
}

const joiAsBytesLike = (): Joi.Schema => {
  return Joi.string()
    .custom((param: string) => {
      return ethers.utils.isBytesLike(param)
    })
    .required()
}

export default {
  joiAsAddress,
  joiAsBytesLike
}
