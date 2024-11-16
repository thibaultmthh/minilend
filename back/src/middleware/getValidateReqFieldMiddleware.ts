import express from 'express'
import { BadRequest } from 'http-errors'
import Joi from 'joi'

import logger from '@/services/logger'

export default function getValidateReqFieldMiddleware(
  fieldKey: keyof express.Request,
  schema: Joi.ObjectSchema
) {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const response = schema.validate(req[fieldKey])

    if (response.error) {
      logger.info('Request is not valid', response.error as Error)
      return next(BadRequest(`Request is not valid: ${response.error}`))
    }
    next()
  }
}
