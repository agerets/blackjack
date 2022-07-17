import { Schema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { catchErrors, validate } from '../';
import { RequestProps } from '../constants';

export const validateRoute = (schema: Schema<any>, reqValidateField = RequestProps.BODY, opts = {}) => {
  return catchErrors(async (req: any, _res: Response, next: NextFunction) => {
    const value = validate(schema, req[reqValidateField], opts);
    // add validated data to req object
    req.validData = Array.isArray(req.validData) ? [...req.validData, ...[value]] : [value];
    return next();
  });
};
