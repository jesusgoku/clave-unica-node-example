import { createLogger, format, transports } from 'winston';

import { NODE_ENV, DEBUG_LEVEL } from './config';

const logger = createLogger({
  level: DEBUG_LEVEL || (NODE_ENV === 'production' ? 'warning' : 'debug'),
  format: format.json(),
  transports: [new transports.Console()],
});

export default logger;
