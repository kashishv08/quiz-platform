// Example for wrapAsync
module.exports = function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next); // Pass any errors to the next middleware
  };
};
