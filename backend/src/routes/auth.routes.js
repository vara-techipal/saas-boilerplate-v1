import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
  res.json({ token });
});

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

router.post('/signup', async (req, res) => {
  const { email, password, name, company } = req.body;
  if (!email || !password || !company) {
    return res.status(400).json({ error: 'Email, password and company required' });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);

    const slug = slugify(company);
    const baseDomain = process.env.APP_BASE_DOMAIN;
    const domain = `${slug}.${baseDomain}`;

    let tenant = await prisma.tenant.findUnique({ where: { slug } });
    if (!tenant) {
      tenant = await prisma.tenant.create({
        data: { name: company, slug, domain }
      });
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
        tenant: { connect: { id: tenant.id } }
      }
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
