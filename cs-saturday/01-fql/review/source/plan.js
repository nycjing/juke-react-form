function Plan () {
  this._limit = Infinity;
}

// Plan.prototype.copy = function () {
//   const newPlan = new Plan();
//   Object.keys(this).forEach((k) => {
//     // lexically inherited `this` (due to arrow function)
//     newPlan[k] = this[k];
//   });
//   return newPlan;
// };

// with `Object.assign`
Plan.prototype.copy = function () {
  const newPlan = new Plan();
  Object.assign(newPlan, this);
  return newPlan;
};

Plan.prototype.setLimit = function (limit) {
  this._limit = limit;
};

Plan.prototype.withinLimit = function (rows) {
  return this._limit > rows.length;
};

Plan.prototype.setSelected = function (columns) {
  if (columns.includes('*')) delete this._selectedColumns;
  else this._selectedColumns = columns;
};

Plan.prototype.selectColumns = function (row) {
  if (!this.hasOwnProperty('_selectedColumns')) return row;
  const selected = {};
  this._selectedColumns.forEach(function (column) {
    selected[column] = row[column];
  });
  return selected;
};

Plan.prototype.setCriteria = function (criteria) {
  this._criteria = criteria;
};

// Plan.prototype.matchesRow = function (row) {
//   for (let column in this._criteria) {
//     const cond = this._criteria[column];
//     const rowValue = row[column];
//     if (typeof cond === 'function') {
//       if (!cond(rowValue)) return false;
//     } else if (cond !== rowValue) return false;
//   }
//   // if we get here everything passed!
//   return true;
// };

// using the `every` method
Plan.prototype.matchesRow = function (row) {
  if (!this.hasOwnProperty('_criteria')) return true;
  const isMatch = Object.keys(this._criteria)
  .every((column) => {
    const cond = this._criteria[column];
    const rowValue = row[column];
    if (typeof cond === 'function') return cond(rowValue);
    else return cond === rowValue;
  });
  return isMatch;
};

Plan.prototype.setIndexLookup = function (column, key) {
  this._indexedColumn = column;
  this._indexedKey = key;
};

Plan.prototype.getInitialRowIds = function (table) {
  if (!this.hasOwnProperty('_indexedColumn')) return table.getRowIds();
  const indexTable = table.getIndexTable(this._indexedColumn);
  return indexTable[this._indexedKey];
};

module.exports = Plan;
