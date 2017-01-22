module.exports = (app, callback) => {
    const user = app.models.user;
    user.find((err, users) => {
        if (err) callback(err);      
        if (!users || users.length == 0) {
            user.create({ username: 'admin', password: 'admin' }, (err, instance) => {
                callback(err);
            })
        }else{
            callback(null)
        }
    })
};