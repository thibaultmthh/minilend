import express from 'express'
import { BadRequest, Forbidden, NotFound, Unauthorized } from 'http-errors'

import logger from '@/services/logger'

const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: express.NextFunction
): void => {
  const payload = {
    projectId: req.projectId,
    apikey: req.headers.apikey
  }
  if (err instanceof BadRequest) {
    logger.info('Bad Request', err, payload)
    res.status(400).json({ error: err.message })
  } else if (err instanceof Forbidden) {
    logger.info('Forbidden', err, payload)
    res.status(403).json({ error: err.message })
  } else if (err instanceof Unauthorized) {
    logger.info('Unauthorized', err, payload)
    res.status(401).json({ error: err.message })
  } else if (err instanceof NotFound) {
    logger.info('Not found', err, payload)
    res.status(404).json({ error: err.message })
  } else {
    logger.error(err.message, err, payload)
    res.status(500).json({ error: 'Server error' })
  }
}

export default errorHandler
