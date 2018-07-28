var databaseHelper = require('../helpers/database-helper');
var bcrypt = require('bcrypt');

module.exports = {
    auth: function (config, creditianals, callback) {
        if (callback && typeof callback === 'function') {
            databaseHelper.getConnection(config, function (err, connection) {
                if (err) {
                    callback(err);
                }
                else {
                    var sql = 'select * from users where username = ?;';
                    connection.query(sql, [creditianals.username], function (err, result, fields) {
                        databaseHelper.closeConnection(connection);
                        if (err) {
                            console.log(err);
                            callback(new Error('Ошибка работы с БД'));
                            return;
                        }
                        if (result.length === 0) {
                            callback(new Error('Пользователь не найден'));
                            return;
                        }

                        bcrypt.compare(creditianals.password, result[0].password, function (err, comp) {
                            if (err) {
                                callback(new Error('Ошибка при проверке пароля'));
                                return;
                            }
                            if (comp === false) {
                                callback(new Error('Неверный пароль'));
                                return;
                            }
                            var user = result[0];
                            user.password = '';
                            callback(null, user);
                        })

                    });
                }
            });
        }
    }
}