const path = require('path');
const dotenv = require('dotenv-safe');

const { EnvHostingEnum } = require('./config.enum');

/**
 * The below configuration with dotenv-safe will ensure that
 * all variables defined in .env.example
 * are also defined in .env
 */
dotenv.config({
    allowEmptyValues: true,
    path: path.join(__dirname, '../../.env'),
    example: path.join(__dirname, '../../.env.example'),
});

const env = process.env.NODE_ENV;
const log = env === EnvHostingEnum.DEVELOPMENT ? 'dev' : 'combined';

const hostname = env === EnvHostingEnum.DEVELOPMENT ? process.env.DEV_HOST_NAME : process.env.PROD_HOST_NAME;
const port = env === 'test' ? 5001 : process.env.PORT || 5000;

const feDomain = env === EnvHostingEnum.DEVELOPMENT
    ? process.env.DEV_FRONTEND_HOST_NAME
    : process.env.PROD_FRONTEND_HOST_NAME;

const db = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    testPort: process.env.DB_TEST_PORT,
    name: process.env.DB_NAME,
};

const databaseUri = env === EnvHostingEnum.TESTING
    ? `mongodb://${db.host}:${db.testPort}/${db.name}`
    : `mongodb://${db.host}:${db.testPort}/${db.name}`;


module.exports = {
    env,
    log,
    port,
    hostname,
    feDomain,
    database: {
        uri: databaseUri,
        name: db.name,
    },
    secretOrPrivateKey: {
        value: process.env.SECRET_OR_PRIVATE_KEY,
        accessTokenExpiration: env === EnvHostingEnum.DEVELOPMENT
            ? process.env.ACCESS_TOKEN_EXPIRATION_IN_MINUTE * 1000
            : process.env.ACCESS_TOKEN_EXPIRATION_IN_MINUTE,
        refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION_IN_HOUR,
    },
};

module.exports.domain = {
    API: env === EnvHostingEnum.DEVELOPMENT
        ? process.env.API_DOMAIN_DEV
        : process.env.API_DOMAIN_PROD,
};

module.exports.ports = {
    API: process.env.API_PORT,
};

module.exports.keys = {
    SECRET: process.env.SECRET_OR_PRIVATE_KEY,
};

module.exports.services = {

};
