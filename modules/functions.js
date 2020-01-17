// groupBy Data with isl no,

let groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
   (rv[x[key]] = rv[x[key]] || []).push(x);
   return rv;
  }, {});
};

module.exports = groupBy;