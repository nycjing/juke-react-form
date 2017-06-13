const fs = require('fs');

module.exports = (done, fileName) => {
  fs.readFile(fileName, 'utf8', (err, fileContents) =>
    err ? done(err) : done(fileContents));
}
