const fs = require('fs');

function Table (folderPath) {
  this._folderPath = folderPath;
}

Table.toFilename = function (id) {
  return id + '.json';
};

Table.toId = function (filename) {
  return filename.slice(0, -5);
};

Table.prototype.read = function (id) {
  const filename = Table.toFilename(id);
  const filepath = this._folderPath + '/' + filename;
  if (!fs.existsSync(filepath)) return;
  const filecontents = fs.readFileSync(filepath);
  const row = JSON.parse(filecontents);
  return row;
};

Table.prototype.getRowIds = function () {
  const filenames = fs.readdirSync(this._folderPath);
  const ids = filenames.map(Table.toId);
  return ids;
};

// // doesn't work
// Table.prototype.getRowIds = function () {
//   const filenames = fs.readdirSync(this._folderPath);
//   filenames.forEach(function (filename) {
//     // filename is local variable inside this function
//     // reassignment only affects other things in this same function that might use the same variable
//     filename = Table.toId(filename);
//   });
//   return filenames;
// };

module.exports = Table;
