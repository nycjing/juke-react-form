const fs = require('fs');

module.exports = done => {
  fs.readdir('.', (err, result) =>
    err ? done(err) : done(result.join(' ')));
}
