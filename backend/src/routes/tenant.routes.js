import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ tenant: req.tenantId });
});

export default router;
