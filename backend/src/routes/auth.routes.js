import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => {
  res.json({ token: 'fake-token' });
});

router.post('/signup', (req, res) => {
  res.json({ id: 1 });
});

export default router;
