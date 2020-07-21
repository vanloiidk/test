const {
    app,
} = require('./config/express');

const { connect } = require('./config/mysql');

const {
    port,
    env,
} = require('./config/vars');

const logger = require('./config/logger');

let appInstance;
const startApp = async () => {
    const conn = await connect();
    app.locals.sqlConn = conn;

    app.listen(port, () => {
        logger.info(`Server is listening on port: ${port} (${env})`);

    });

    return app;
};

appInstance = startApp();

module.exports = { appInstance };
