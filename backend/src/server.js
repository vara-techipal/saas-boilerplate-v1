import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
