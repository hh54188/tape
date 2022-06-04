/**
* Required External Modules
*/

import path from 'path';
import express from 'express';
import cors from "cors";
import csrf from "csurf";
import helmet from "helmet";
import subscriptionRouter from './subscription/subscription.router';

/**
 * App Variables
 */

const app: express.Application = express();

/**
 *  App Configuration
 */

app.use(cors({
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  origin: [/v2think\.com$/],
  credentials: true,
}));
app.use(helmet());
app.use(express.json());
app.set('trust proxy', true);
app.use(express.urlencoded({extended: true}));
app.use('/public', express.static(path.join(__dirname, '/public')))

/**
 *  Router Configuration
 */

app.use('/api/v1/subscribe', subscriptionRouter);
app.use('/api/v1/health', async (req, res) => res.sendStatus(200));
app.use('/*', async (req, res) => res.sendStatus(404));

export default app;
