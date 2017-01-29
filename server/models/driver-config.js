"use strict"
const async = require('async')
    , debug = require('debug')('gateway, explorer')
    , request = require('request')
    , redis = require('redis');

module.exports = function (DriverConfig) {

    let app;
    let publisher;

    DriverConfig.on('attached', function (a) {
        app = a;
        publisher = redis.createClient({
            host: app.get('redis_host'),
            port: 6379
        });
    });

    DriverConfig.observe('after save', function (ctx, next) {
        publisher.publish("cluster", JSON.stringify({ action: "update" }));
        next();
    });

    DriverConfig.observe('after delete', function (ctx, next) {
        publisher.publish("cluster", JSON.stringify({ action: "update" }));
        next();
    });
};
