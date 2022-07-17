import * as Joi from 'joi';
import { suits, values } from './constants';

export const CardSchema = Joi.object({
    suit: Joi.string().valid(...suits).required(),
    value: Joi.string().valid(...values).required(),
});
