import * as http from 'http';
import { app } from './app';
import { onError } from './utils/express';
import { config } from './config';
import { log } from './utils';

export const webAppServer: http.Server = http.createServer(app);

webAppServer.on('error', onError);
webAppServer.listen(config.get('port'), (): void => {
  log(`Connected successfully on port ${config.get('port')}`);
});
