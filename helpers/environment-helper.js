var fs = require('fs');
var path = require('path');

module.exports = {
    getEnvironment: function (variable, callback) {
        if (callback && typeof callback === 'function') {
            var pUrl = path.join(__dirname, '..', 'env_' + variable + '.js');
            //var path  = "../env_" + variable + '.js';

            if (fs.existsSync(pUrl)) {
                var env = require(pUrl);
                callback(null, env);
            }
            else {
                callback(new Error('File not found'));
            }
        }
    }
};