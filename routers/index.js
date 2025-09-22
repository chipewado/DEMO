const accountRouter = require('./account.router'); 


module.exports = (app) => {
    app.use('/api/accounts', accountRouter);

    // app.use('/api/users', accountRouter);
}