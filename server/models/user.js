'use strict';

module.exports = function (User) {
 
    User.disableRemoteMethodByName('prototype.__count__accessTokens');
    User.disableRemoteMethodByName('prototype.__create__accessTokens');
    User.disableRemoteMethodByName('prototype.__delete__accessTokens');
    User.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
    User.disableRemoteMethodByName('prototype.__findById__accessTokens');
    User.disableRemoteMethodByName('prototype.__get__accessTokens');
    User.disableRemoteMethodByName('prototype.__updateById__accessTokens');

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
