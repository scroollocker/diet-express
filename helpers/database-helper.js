const mysql = require('mysql');

module.exports = {
    getConnection: function (config, callback) {
        if (callback && typeof callback === 'function') {
            var connection = mysql.createConnection(config);

            connection.connect(function (err) {
                if (err) {
                    console.log(err);
                    callback(new Error('Ошибка соединения с БД'));
                    return;
                }
                callback(null, connection);
            });
        }
    },

    closeConnection: function (connection) {
        if (connection) {
            connection.end(function (err) {
                if (err) console.log(err);
            })
        }
    }
};