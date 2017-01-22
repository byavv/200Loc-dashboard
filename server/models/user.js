'use strict';

module.exports = function (User) {

    delete User.validations.email;

    User.signup = function (data, clb) {
        User.create({
            username: data.username,
            password: data.password
        }, clb)
    };
    User.remoteMethod('signup', {
        accepts: {
            arg: 'data',
            type: 'object',
            http: (ctx) => {
                return ctx.req.body;
            }
        },
        returns: { type: 'object', root: true },
        http: { path: '/signup', verb: 'post', errorStatus: 400 }
    });


    User.change = function (data, clb) {
        console.log(data)
        User.findOne((err, user) => {
            if (!user || err) throw err ? err : new Error('Default user is not defined');
            user.replaceAttributes({
                username: data.username,
                password: data.password
            }, clb)
        });
    };
    User.remoteMethod('change', {
        accepts: {
            arg: 'data',
            type: 'object',
            http: (ctx) => {
                return ctx.req.body;
            }
        },
        returns: { type: 'object', root: true },
        http: { path: '/change', verb: 'post', errorStatus: 400 }
    });
};
