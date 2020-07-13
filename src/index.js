const {
    app,
} = require('./config/express');

const { connect: dbConnect } = require('./config/mongo');

const {
    port,
    env,
} = require('./config/vars');

const logger = require('./config/logger');

let appInstance;
const startApp = async () => {
    const dbConnection = await dbConnect();
    app.locals.db = dbConnection;

    app.listen(port, () => {
        logger.info(`Server is listening on port: ${port} (${env})`);

    });

    return app;
};

appInstance = startApp();

module.exports = { appInstance };
