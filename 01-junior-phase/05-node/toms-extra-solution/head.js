const fs = require('fs');

const head = contents =>
  contents.split('\n').slice(0, 10).join('\n');

module.exports = (done, fileName, stdin) => {
  stdin ?
    done(head(stdin)) :
    fs.readFile(fileName, 'utf8', (err, fileContents) =>
      err ? done(err) : done(head(fileContents)))
}
