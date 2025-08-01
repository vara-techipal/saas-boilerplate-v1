import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import prisma from '../prisma/client.js';

const router = Router();

router.get('/me', requireAuth, async (req, res) => {
  try {
    const userWithTenant = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { tenant: true }
    });
    if (!userWithTenant) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { password, ...user } = userWithTenant;
    res.json({ user, tenant: userWithTenant.tenant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
