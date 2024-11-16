import express from 'express'
import { IncomingHttpHeaders } from 'http'
import { Forbidden } from 'http-errors'

import globalConfig from '@/config/globalConfig'
import logger from '@/services/logger'

type Middleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void

export enum ApiKeyAccess {
  PUBLIC = 'public',
  SECRET = 'secret',
  ADMIN = 'admin'
}

interface AuthenticatedConsumer {
  projectId: string
  scopes: string | string[]
  access: string
  chainId: number
}

const _authenticateConsumer = (
  headers: IncomingHttpHeaders
): AuthenticatedConsumer => {
  const projectId = headers['x-consumer-username']
  const scopes = headers['x-consumer-groups']
  const access = headers['x-consumer-access']
  const chainId = headers['x-project-chain-id']

  if (!projectId || !scopes || !access || !chainId) {
    throw Forbidden('Request not authenticated, requires a valid apikey')
  }
  if (
    typeof projectId !== 'string' ||
    typeof access !== 'string' ||
    !(typeof scopes === 'string' || Array.isArray(scopes)) ||
    typeof chainId !== 'string'
  ) {
    throw Forbidden('Invalid authenticated headers')
  }

  const providedChainId = Number(chainId)
  if (
    access != ApiKeyAccess.ADMIN &&
    globalConfig.networks[providedChainId] == undefined
  ) {
    throw Forbidden('Network not supported')
  }

  return {
    projectId: projectId,
    scopes: scopes,
    access: access,
    chainId: providedChainId
  }
}

const apiAuthMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  try {
    const consumer = _authenticateConsumer(req.headers)

    req.access = consumer.access
    req.projectId = consumer.projectId
    req.chainId = consumer.chainId

    return next()
  } catch (error) {
    logger.info('Unauthorized route', error as Error, {
      apikey: req.headers.apikey,
      apisecret: req.headers.apisecret
    })
    return next(error)
  }
}

export const accessAuthMiddleware = (allowed: ApiKeyAccess[]): Middleware => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    if (!req.access) {
      return next(
        Forbidden('Request not authenticated, requires a valid apikey')
      )
    }
    if (!allowed.includes(req.access as ApiKeyAccess)) {
      return next(Forbidden("ApiKey doesn't have the required access level"))
    }
    return next()
  }
}

export default apiAuthMiddleware
