import { RequestHandler, Request, Response, NextFunction } from "express";
import * as Joi from 'joi'

export const checkRequestPayload: RequestHandler = function (req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    email: Joi.string().email()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.redirect('/public/error.html');
  }
  next()
}
