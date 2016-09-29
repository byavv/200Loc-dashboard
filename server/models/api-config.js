
"use strict"
const async = require('async')
    , debug = require('debug')('gateway, explorer')
    , redis = require('redis')

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
}