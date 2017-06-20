const models = require('./models');
const Page = models.Page;
const User = models.User;
const app = require('./app');

User.sync()
    .then(function () {
        return Page.sync();
    })
    .then(function () {
        app.listen(3001, function () {
            console.log('Server is listening on port 3001!');
        });
    });

