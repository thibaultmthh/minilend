import * as mongoDB from 'mongodb'

import globalConfig from '@/config/globalConfig'
import logger from '@/services/logger'

let mongoDatabase: mongoDB.Db
let client: mongoDB.MongoClient

export async function connectToDatabase(
  mongoUrl: string,
  databaseSuffix = ''
): Promise<void> {
  client = new mongoDB.MongoClient(mongoUrl)
  await client.connect()

  mongoDatabase = client.db(globalConfig.mongoDbName + databaseSuffix)

  logger.info(
    `Successfully connected to database: ${mongoDatabase.databaseName}`
  )
}

export const closeConnection = async (): Promise<void> => {
  await client.close()
}

export const dropDatabase = async (): Promise<void> => {
  await mongoDatabase.dropDatabase()
}

export const getCollection = <TSchema extends mongoDB.Document>(
  collectionName: string
): mongoDB.Collection<TSchema> => {
  return mongoDatabase.collection<TSchema>(collectionName)
}
