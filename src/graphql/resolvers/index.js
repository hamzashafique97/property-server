const userResolver = require("./userResolver");
// const plotResolver = require("./plotResolver");
// const clientResolver = require("./clientResolver");

const rootResolver = {
  ...userResolver,
  // ...plotResolver,
  // ...clientResolver
};

module.exports = rootResolver;
