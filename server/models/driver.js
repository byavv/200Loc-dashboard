'use strict';
const async = require('async'),
    request = require('request')

module.exports = function (Driver) {
    Driver.on('attached', function () {
        Driver.find = function (filter, ctx, callback) {
            request({
                url: `http://${process.env.GATEWAY}/_private/drivers`,
                method: 'GET'
            }, function (err, responce, body) {
                if (err) return callback(err);
                if (responce) {
                    callback(null, JSON.parse(body));
                } else {
                    callback(new Error('No respond from remote server'));
                }
            });
        }
    });

    Driver.template = function (name, callback) {
        request({
            url: `http://${process.env.GATEWAY}/_private/driver/config/${name ? name : ''}`,
            method: 'GET'
        }, function (err, responce, body) {
            if (err) return callback(err);
            if (responce) {
                callback(null, JSON.parse(body));
            } else {
                callback(new Error('No respond from remote server'));
            }
        });
    };
    Driver.remoteMethod('template', {
        accepts: {
            arg: 'name',
            type: 'string'
        },
        returns: { type: 'object', root: true },
        http: { path: '/template/:name', verb: 'get', errorStatus: 500 }
    });
};
