const fs = require('fs');

const tail = (done, contents) => {
  const contentArr = contents.split('\n');
  const len = contentArr.length;
  done(contentArr.slice(len - 10, len).join('\n'));
};

module.exports = (done, fileName, stdin) => {
  stdin ?
    tail(done, stdin) :
    fs.readFile(fileName, 'utf8', (err, fileContents) =>
      err ? done(err) : tail(done, fileContents));
}
