import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import tenantRoutes from './routes/tenant.routes.js';
import { setTenant } from './middleware/tenant.middleware.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(setTenant);

app.use('/auth', authRoutes);
app.use('/tenant', tenantRoutes);

export default app;
