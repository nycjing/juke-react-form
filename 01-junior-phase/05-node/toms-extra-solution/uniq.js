const fs = require('fs');

const cat = (done, contents) => {
  const fileArr = fileContents.split('\n');
  done(fileArr
    .filter((line, idx)=> line !== fileArr[idx - 1])
    .join('\n')
  );
};

module.exports = (done, fileName, stdin) => {
  stdin ?
    cat(done, stdin) :
    fs.readFile(fileName, 'utf8', (err, fileContents) =>
      err ? done(err) : cat(done, fileContents));
};
