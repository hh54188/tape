import express from 'express';
import * as uuid from 'uuid';
import * as cosmosDbClient from "../clients/azure-cosmos-database-client";
import { body, validationResult } from 'express-validator';
const router = express.Router();

router.post('/',
  body('email').isEmail().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email} = req.body
    await cosmosDbClient.createSubscriptionItem({
      id: uuid.v4(),
      email,
    })
    return res.sendStatus(200)
  })

export default router;
