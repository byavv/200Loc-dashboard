
"use strict"
const async = require('async')
    , debug = require('debug')('gateway, explorer')
    , request = require('request')
    , redis = require('redis');


module.exports = function (ApiConfig) {
    let app;
    let publisher;

    ApiConfig.on('attached', function (a) {
        app = a;
        publisher = redis.createClient({
            host: app.get('redis_host'),
            port: 6379
        });
    });

    ApiConfig.observe('after save', function (ctx, next) {
        publisher.publish("cluster", JSON.stringify({ action: "update" }));
        next();
    });

    ApiConfig.test = function (data, callback) {
        console.log(data)
        request({
            url: `http://${process.env.GATEWAY}/_private/entry/test`,
            method: 'post',
            headers: { 'content-type': 'application/json' },
            json: data
        }, function (err, responce, body) {
            if (err) return callback(err)
            if (responce) {
                return callback(null, body);
            } else {
                return callback(new Error('No responce from remote server'));
            }
        });
    };
    ApiConfig.remoteMethod('test', {
        accepts: {
            arg: 'data',
            type: 'object',
            http: (ctx) => {
                return ctx.req.body;
            }
        },
        returns: { type: 'object', root: true },
        http: { path: '/test', verb: 'post', errorStatus: 400 }
    });
}