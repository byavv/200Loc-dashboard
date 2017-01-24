'use strict';
const async = require('async'),
    request = require('request')

module.exports = function (Plugin) {

    Plugin.on('attached', function () {
        Plugin.find = function (filter, ctx, callback) {
            request({
                url: `http://${process.env.GATEWAY}/_private/plugins`,
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
};
