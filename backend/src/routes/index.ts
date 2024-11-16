import { Router, Request, Response } from 'express';

const router: Router = Router();

// Example route
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the backend API fdp!' });
});

export default router;
