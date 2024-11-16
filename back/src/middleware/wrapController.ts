import express from 'express'

export default function wrapController(
  controllerFunction: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void
) {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    try {
      await controllerFunction(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
