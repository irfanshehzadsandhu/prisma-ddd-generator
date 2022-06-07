---
to: Bin/www.ts
---
import * as dotenv from "dotenv";

dotenv.config();
import config from "../App/Infrastructure/Config";
import logger from "../App/Infrastructure/Logger/logger";
import {httpServer} from "../App/HTTP/Bootstrap/app";

const server = config.server;

httpServer.listen(server.PORT, () => {
  logger.debug(`${server.APP_NAME} Listening on port ${server.PORT} `);
});