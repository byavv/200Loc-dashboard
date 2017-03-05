"use strict"
const async = require('async')
    , debug = require('debug')('gateway, explorer')
    , request = require('request')
    , redis = require('redis');

module.exports = function (ServiceConfig) {

    let app;
    let publisher;

    ServiceConfig.on('attached', function (a) {
        app = a;
        publisher = redis.createClient({
            host: app.get('redis_host'),
            port: app.get('redis_port')
        });
    });

    ServiceConfig.observe('after save', function (ctx, next) {
        publisher.publish("cluster", JSON.stringify({ action: "update" }));
        next();
    });

    ServiceConfig.observe('after delete', function (ctx, next) {
        publisher.publish("cluster", JSON.stringify({ action: "update" }));
        next();
    });
};
