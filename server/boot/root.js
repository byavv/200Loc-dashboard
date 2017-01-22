/*jslint node: true */
'use strict';
const path = require("path"),
    async = require('async'),
    request = require('request')
    ;

module.exports = function (app) {
    var router = app.loopback.Router();
    var ApiConfig = app.models.ApiConfig;
    var User = app.models.user;

    // router.get('/api/configs', (req, res) => {
    //     ApiConfig.find((err, configs) => {
    //         res.send(configs);
    //     });
    // });

    router.get('/api/plugins', (req, res, next) => {
        request({
            url: `http://${process.env.GATEWAY}/_private/plugins`,
            method: 'GET'
        }, function (err, responce, body) {
            if (err) return next(err)
            if (responce) {
                return res.status(responce.statusCode).send(body)
            } else {
                return res.sendStatus(500)
            }
        });
    });

    // router.delete('/api/config/:id', (req, res) => {
    //     ApiConfig.destroyById(req.params.id, (err, result) => {
    //         if (err) return res.sendStatus(500);
    //         return res.send(result);
    //     });
    // });
    /**
     * Get all installed drivers
     */
    router.get('/api/drivers', (req, res, next) => {
        request({
            url: `http://${process.env.GATEWAY}/_private/drivers`,
            method: 'GET'
        }, function (err, responce, body) {
            if (err) return next(err)
            if (responce) {
                return res.status(responce.statusCode).send(body)
            } else {
                return res.sendStatus(500)
            }
        });
    });
    /**
     * Get driver template by it's name'
     */
    router.get('/api/driver/config/:name', (req, res) => {
        const name = req.params['name'];
        request({
            url: `http://${process.env.GATEWAY}/_private/driver/config/${name ? name : ''}`,
            method: 'GET'
        }, function (err, responce, body) {
            if (err) return next(err)
            if (responce) {
                return res.status(responce.statusCode).send(body)
            } else {
                return res.sendStatus(500)
            }
        });
    });
    /**
     * Test entry request
     */
    router.post('/api/test', (req, res, next) => {
        request({
            url: `http://${process.env.GATEWAY}/_private/entry/test`,
            method: 'post',
            headers: { 'content-type': 'application/json' },
            json: req.body
        }, function (err, responce, body) {
            if (err) return next(err)
            if (responce) {
                return res.status(responce.statusCode).send(body);
            } else {
                return res.sendStatus(400);
            }
        });
    });

    // router.post('/login', function (req, res, next) {
    //     User.login({
    //         email: req.body.username,
    //         username: req.body.username,
    //         password: req.body.password
    //     }, 'user', function (err, token) {
    //         if (err) return next(err);
    //         return res.status(200).send(token)
    //     });
    // });

    // router.post('/signup', function (req, res, next) {
    //     User.create({
    //         email: req.body.username,
    //         username: req.body.username,
    //         password: req.body.password
    //     }, function (err, userInstance) {
    //         if (err) return next(err);
    //         return res.status(200).send(userInstance);
    //     });
    // });

    // router.get('/logout', function (req, res, next) {
    //     if (!req.accessToken) return res.sendStatus(401);
    //     User.logout(req.accessToken.id, function (err) {
    //         if (err) return next(err);
    //         return res.sendStatus(200);
    //     });
    // });

    app.use(router);
};