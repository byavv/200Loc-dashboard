'use strict';
const async = require('async'),
    request = require('request')

module.exports = function (Service) {
    Service.on('attached', function () {
        Service.find = function (filter, ctx, callback) {
            request({
                url: `http://${process.env.GATEWAY}/_private/services`,
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

    Service.template = function (name, callback) {
        request({
            url: `http://${process.env.GATEWAY}/_private/service/config/${name ? name : ''}`,
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

    Service.remoteMethod('template', {
        accepts: {
            arg: 'name',
            type: 'string'
        },
        returns: { type: 'object', root: true },
        http: { path: '/template/:name', verb: 'get', errorStatus: 500 }
    });

    ///_private/service/status/:serviceId
    Service.check = function (id, callback) {
        request({
            url: `http://${process.env.GATEWAY}/_private/service/status/${id}`,
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
    Service.remoteMethod('check', {
        accepts: {
            arg: 'id',
            type: 'string',
            required: false,
            default: "all"
        },
        returns: { type: 'object', root: true },
        http: { path: '/check/:id', verb: 'get', errorStatus: 500 }
    });

};
