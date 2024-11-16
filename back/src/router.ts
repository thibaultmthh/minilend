import bodyParser from 'body-parser'
import cors from 'cors'
import { Router } from 'express'

import walletRouter from './wallet/walletRouter'

const router = Router()

const OPEN_API_FILE_NAME = 'api.yml'
const OPEN_API_FILE_PATH = `./dist/${OPEN_API_FILE_NAME}`

router.use(bodyParser.json())
router.use(
  cors({
    origin: true,
    credentials: true
  })
)



router.use('/wallet', walletRouter)

export default router
