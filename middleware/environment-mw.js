
var envHelper = require('../helpers/environment-helper');

module.exports = function (req, res, next) {
      var env = process.env.NODE_ENV;

      console.log(env);

      if (env) {
          envHelper.getEnvironment(env, function (err, env_object) {
              if (err) {
                  console.log(err);
                  next();
                  return;
              }

              req.environment = env_object;


              next();
          });
      }
      else {
          req.environment = {};
          next();
      }


};