/* eslint-disable @typescript-eslint/camelcase */
import fs from 'fs';
import path from 'path';
import https from 'https';

import logger from './logger';
import app from './app';

import { PORT, SSL_CERT_PATH, SSL_KEY_PATH } from './config';

const server = https.createServer({
  key: fs.readFileSync(path.resolve(__dirname, '..', SSL_KEY_PATH)),
  cert: fs.readFileSync(path.resolve(__dirname, '..', SSL_CERT_PATH)),
}, app);

server.listen(PORT, () => {
  logger.info(`Listen on: https://claveunica-dev.jesusurrutia.com:${PORT}`);
});
