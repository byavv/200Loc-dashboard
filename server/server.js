"use strtict"
const boot = require('loopback-boot')
    , http = require('http')
    , path = require('path')
    , _ = require('lodash')
    , minimist = require('minimist')
    , loopback = require('loopback');

const app = loopback();
const logger = require('./scripts/logger');

const defaults = {
    string: ['env', 'link', "p"],
    default: {
        env: process.env.NODE_ENV || 'development',
        link: process.env.GATEWAY || 'localhost:3001',
        p: process.env.HTTP_PORT || 5601
    }
};
const options = minimist(process.argv.slice(2), defaults);
process.env.NODE_ENV = options.env;
process.env.GATEWAY = _.isArray(options.link) ? [...options.link].pop() : options.link;
process.env.HTTP_PORT = _.isArray(options.p) ? [...options.p].pop() : options.p;

//const redis_host = process.env.REDIS_HOST || '127.0.0.1';
//const redis_port = process.env.REDIS_PORT || '6379';

const redis_host = process.env.REDIS_HOST || 'redis-11757.c10.us-east-1-2.ec2.cloud.redislabs.com';
const redis_port = process.env.REDIS_PORT || '11757';

app.set("redis_host", redis_host);
app.set("redis_port", redis_port);
      
const http_port = process.env.HTTP_PORT;

boot(app, __dirname, (err) => {
    if (err) throw err;
    app.start = function () {
        logger.info('Explorer starting...');
        const httpServer = http.createServer(app)
            .listen(http_port, () => {
                app.emit('started');
                app.close = (done) => {
                    app.removeAllListeners('started');
                    app.removeAllListeners('loaded');
                    httpServer.close(done);
                };
                process.once("SIGTERM", () => {
                    app.close(() => { process.exit(0); });
                });
                logger.info(`Explorer started on ${http_port}`)
            });
    };

    if (require.main === module)
        app.start();
    app.loaded = true;
    app.emit('loaded');
});
