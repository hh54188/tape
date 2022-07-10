/**
* Required External Modules
*/

import path from 'path';
import express from 'express';
import cors from "cors";
import csrf from "csurf";
import helmet from "helmet";
import subscriptionRouter from './domains/subscription/subscription.router';
import healthRouter from './domains/health/health.router';

/**
 * App Variables
 */

const app: express.Application = express();

/**
 *  App Configuration
 */

app.use(cors({
  methods: ['POST'],
  origin: [/v2think\.com$/],
  credentials: true,
}));
app.use(helmet());
app.use(express.json());
app.set('trust proxy', true);
app.use(express.urlencoded({extended: true}));

/**
 *  Router Configuration
 */

app.use('/api/v1/subscribe', subscriptionRouter);
app.use('/api/v1/health', healthRouter);
app.use('/*', async (req, res) => res.sendStatus(404));

export default app;
