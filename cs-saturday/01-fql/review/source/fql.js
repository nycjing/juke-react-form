const Plan = require('./plan');

function FQL (table, plan = new Plan()) { // <= default value (cool!)
  this._table = table; // <= underscore denotes internal
  // job of the plan: manage things for the query
  this._plan = plan;
}

FQL.prototype.get = function () {
  const ids = this._table.getRowIds();
  const rows = [];
  for (let index = 0; index < ids.length; index++) {
    if (!this._plan.withinLimit(rows)) break;
    const id = ids[index];
    const row = this._table.read(id);
    if (this._plan.matchesRow(row)) {
      const selected = this._plan.selectColumns(row);
      rows.push(selected);
    }
  }
  return rows;
};

FQL.prototype.count = function () {
  return this.get().length;
};

FQL.prototype.limit = function (n) {
  const newFql = new FQL(this._table, this._plan.copy());
  newFql._plan.setLimit(n);
  return newFql;
};

// FQL.prototype.select = function () {
//   const columns = Array.prototype.slice.call(arguments);
//   const newFql = new FQL(this._table, this._plan.copy());
//   newFql._plan.setSelected(columns);
//   return newFql;
// };

// with fancy spread
FQL.prototype.select = function (...columns) {
  const newFql = new FQL(this._table, this._plan.copy());
  newFql._plan.setSelected(columns);
  return newFql;
};

FQL.prototype.where = function (criteria) {
  const newFql = new FQL(this._table, this._plan.copy());
  newFql._plan.setCriteria(criteria);
  return newFql;
};

module.exports = FQL;
