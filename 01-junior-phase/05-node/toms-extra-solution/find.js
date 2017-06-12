/*
 * This is the extra credit!
 * It's fairly difficult!
*/
const fs = require('fs');
const path = require('path');

const checkStat = (cb, name) => {
  fs.stat(name, (err, stat) => {
    if (err) throw err;

    if (stat.isDirectory()) walk(cb, name);
    else cb(name);
  });
};

const walk = (done, dirName) => {
  let results = [dirName];

  fs.readdir(dirName, (err, names) => {
    if (err) throw err;

    let counter = 0;
    const len = names.length;

    (function next (name) {

      checkStat(name => {
        results = [...results, name];
        counter++;
        if (counter === len) done(results);
        else next(path.join(dirName, names[counter]));
      }, name);

    })(path.join(dirName, names[counter]))

  });
};

const flatten = arr =>
  arr.reduce((results, item) =>
    Array.isArray(item) ?
      [...results, ...flatten(item)] :
      [...results, item], []);

module.exports = (done, dirName) => {
  walk(results => {
    done(flatten(results).join('\n'));
  }, dirName);
};
