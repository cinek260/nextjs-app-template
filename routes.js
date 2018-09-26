const routes = require("next-routes");
const { languagesPattern } = require("./consts");

module.exports = routes()
  .add("index", `/:lng(${languagesPattern})/`)
  .add("page", `/:lng(${languagesPattern})/page`);
