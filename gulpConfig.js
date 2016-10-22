/*jslint node: true */
'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname);
var conf = {
    dirs: {
        client: 'client',
        build: 'dist',
        coverage: process.env.CIRCLE_ARTIFACTS || 'coverage'
    },
    src: {
        gateway: {
            server: {
                js: [
                    'gateway/src/**/*.js',
                    '!gateway/src/**/*.spec.js'
                ],
                tests: [
                    'gateway/test/**/*.spec.js'
                ]
            }
        },
        explorer: {
            server: {
                js: [
                    'server/**/*.js',
                    '!server/**/*.spec.js'
                ],
                tests: [
                    'test/**/*.spec.js',
                ]
            },
            client: {
                ts: [

                ],
                tests: [

                ]
            }
        },
        plugins: {
            js: [
                'plugins/**/*.js',
                '!plugins/**/*.spec.js',
            ],
            tests: [
                'plugins/**/*.spec.js',
            ]
        }
    },
    options: {
        mocha: {
            reporter: 'spec'
        }
    }
};

module.exports = conf;