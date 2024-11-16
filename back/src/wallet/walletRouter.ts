import { Router } from 'express'

import apiAuthMiddleware from '@/middleware/apiAuthMiddleware'
import wrapController from '@/middleware/wrapController'

import walletController from './walletController'

const walletRouter = Router({ mergeParams: true })

walletRouter.use(apiAuthMiddleware)

walletRouter.post('/', wrapController(walletController.createWallet))

export default walletRouter
