import express from 'express';
import * as uuid from 'uuid';
import * as cosmosDbClient from "../../clients/azure-cosmos-database-client";
import {checkRequestPayload} from './subscription.middleware'
const router = express.Router();

const subscriptionSuccessRedirectUrl = <string>process.env.SUBSCRIPTION_SUCCESS_REDIRECT_URL;
router.post('/', checkRequestPayload, async (req, res) => {
    const {email} = req.body
    await cosmosDbClient.createSubscriptionItem({
      id: uuid.v4(),
      email,
    })
    return res.redirect(subscriptionSuccessRedirectUrl);
  })

export default router;
