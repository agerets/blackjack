import * as Joi from 'joi';
import { CardSchema } from '../card';
import { DECK_SIZE } from './constants';

export const DeckSchema = Joi.array().items(CardSchema).min(DECK_SIZE).max(DECK_SIZE).required();
