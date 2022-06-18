import { RequestHandler, Request, Response, NextFunction } from "express";
import * as Joi from 'joi'

const subscriptionErrorRedirectUrl = <string>process.env.SUBSCRIPTION_ERROR_REDIRECT_URL;
export const checkRequestPayload: RequestHandler = function (req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    email: Joi.string().email()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.redirect(subscriptionErrorRedirectUrl);
  }
  next()
}
