import express from 'express';
import setupSwagger from './swagger';
import "dotenv/config"

import userRoutes from './routes/userRoutes';
import jobRoutes from './routes/jobRoutes';
import errorHandler from './middlewares/errorHandler';
import logger from './utils/logger';
import setupCronJobs from './services/setupCronJobs ';


export const app = express();
const baseUrl = process.env.BASE_URL || '/api/v1';

app.set('trust proxy', true);

app.use(express.json());
app.use(express.static('public'));

setupSwagger(app);

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send(`
  <div style="height: 100vh;width: 100vw;display: flex;justify-content: center; align-items: center;flex-direction: column">
    <h1 style="font-size: 50px">Welcome to Ethio Job APi</h1>
    <p>please visit <a href="/api">api</a></p>
  </div>
  `);
});


setupSwagger(app);

setupCronJobs("0 */4 * * *");


app.use(baseUrl + '/users', userRoutes);
app.use(baseUrl+'/jobs',jobRoutes)

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
