const fs = require('fs');

const wc = contents =>
  contents
    .split('\n')
    .join(' ')
    .split(' ')
    .reduce((sum, word) => ++sum, 0);

module.exports = (done, fileName, stdin) => {
  stdin ?
    done(wc(stdin)) :
    fs.readFile(fileName, 'utf8', (err, fileContents) =>
      err ? done(err) : done(wc(fileContents)));
};
