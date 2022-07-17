import { Request, Response, Router } from 'express';
import { log } from './utils';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import {
  gameRouter,
} from './entities';

export const router = Router({ mergeParams: true });

router.get('/ping', (_req: Request, res: Response) => {
  log(`Pong!`);
  res.sendJson(StatusCodes.OK, { success: true });
});

// TODO: add authorization middleware
router.use('/game', gameRouter);

//TODO: improve routing so 404 is not protected
router.all('*', (_req, res) => {
  res.sendJson(StatusCodes.NOT_FOUND, { error: ReasonPhrases.NOT_FOUND });
});
