import * as Joi from 'joi';

export const GameSchema = Joi.object({
    playerName: Joi.string(),
    botName: Joi.string(),
});
