const fs = require('fs');

const sort = contents =>
  contents.split('\n').sort().join('\n');

module.exports = (done, fileName, stdin) => {
  stdin ?
    done(sort(stdin)) :
    fs.readFile(fileName, 'utf8', (err, fileContents) =>
      err ? done(err) : done(sort(fileContents)));
};
