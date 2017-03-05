
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
            port: app.get('redis_port')
        });
    });

    ApiConfig.observe('after save', function (ctx, next) {
        publisher.publish("cluster", JSON.stringify({ action: "update" }));
        next();
    });

    ApiConfig.observe('after delete', function (ctx, next) {
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


    // ApiConfig.searchByName = function (query, cb) {
    //     ApiConfig
    //         .find(query)           
    //         .then((configs) => {
    //             return cb(null, configs)
    //         }).catch((err) => {
    //             return cb(err)
    //         });
    // }
    // ApiConfig.remoteMethod('searchByName', {
    //     accepts: [
    //         {
    //             arg: 'query',
    //             type: 'object',
    //             http: (ctx) => {
    //                 var filterQuery = _createFilterQuery(ctx.req.body);
    //                 var optionsQuery = _createOptionsQuery(ctx.req.body);
    //                 return Object.assign({ where: filterQuery }, optionsQuery);
    //             }
    //         }
    //     ],
    //     returns: { type: 'array', root: true },
    //     http: { path: '/searchByName', verb: 'post', errorStatus: 400 }
    // });

    
    // ApiConfig.countByName = function (query, cb) {
    //     ApiConfig
    //         .count(query)           
    //         .then((count) => {
    //             return cb(null, count)
    //         }).catch((err) => {
    //             return cb(err)
    //         });
    // }
    // ApiConfig.remoteMethod('countByName', {
    //     accepts: [
    //         {
    //             arg: 'query',
    //             type: 'object',
    //             http: (ctx) => {
    //                 var filterQuery = _createFilterQuery(ctx.req.body);
    //                 var optionsQuery = _createOptionsQuery(ctx.req.body);
    //                 return Object.assign({ where: filterQuery }, optionsQuery);
    //             }
    //         }
    //     ],
    //     returns: { type: 'array', root: true },
    //     http: { path: '/countByName', verb: 'post', errorStatus: 400 }
    // });

    // function _createFilterQuery(request) {
    //     var query = [];
    //     if (request) {
    //         if (request.name) {
    //             query.push({ name: { regexp: `.*${request.name}.*` } });
    //         }
    //     }
    //     return query.length > 0 ? { and: query } : {};
    // }

    // function _createOptionsQuery(request) {
    //     var query = {};
    //     if (request.limit) {
    //         Object.assign(query, { limit: +request.limit })
    //     }
    //     if (request.limit && request.page) {
    //         Object.assign(query, { skip: (+request.limit) * (+request.page - 1) })
    //     }
    //     return query;
    // }
}