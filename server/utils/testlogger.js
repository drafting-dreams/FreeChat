const logger = require("./getLogger");

logger.info("user is ", false);
logger.info("user is ", {name: 'ha'});
logger.info({name: 'ha'});
