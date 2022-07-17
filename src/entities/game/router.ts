import axios from 'axios';
import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validateRoute } from '../../utils/middleware/';
import { catchErrors } from '../../utils';
import { Game } from './service';
import { GameSchema } from './schema';
import { DeckSchema } from '../deck';
import { config } from '../../config';
import { RequestProps  } from '../../utils/constants';
import { log, validate } from '../../utils';

export const gameRouter = Router({ mergeParams: true });

gameRouter.get(
  '/play',
  validateRoute(GameSchema, RequestProps.QUERY),
  catchErrors(async (req: Request, res: Response) => {
    const deckUrl: any = config.get('deckUrl');
    const { data } = await axios.get(deckUrl);
    const deck = validate(DeckSchema, data);
    const { playerName, botName } = req.query as any;

    const result = Game.play({
        playerName,
        botName,
        deck,
    });

    log(result);

    return res.sendJson(StatusCodes.OK, result);
  }),
);
