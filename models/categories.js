var databaseHelper = require('../helpers/database-helper');

module.exports = {
    getCategories: function (config, callback) {
        if (callback && typeof callback === 'function') {
            databaseHelper.getConnection(config, function (err, connection) {
                if (err) {
                    console.log(err);
                    callback(new Error('Ошибка соеденения с БД'));
                    return;
                }

                var sql = 'select * from categories';

                connection.query(sql, function (err, results) {
                    databaseHelper.closeConnection(connection);
                    if (err) {
                        console.log(err);
                        callback(new Error('Ошибка получения данных из БД'));
                        return;
                    }

                    callback(null, results);
                });
            });
        }
    },

    addCategory: function (config, category, callback) {
        if (callback && typeof callback === 'function') {
            databaseHelper.getConnection(config, function (err, connection) {
                if (err) {
                    console.log(err);
                    callback(new Error('Ошибка соеденения с БД'));
                    return;
                }

                var params = [
                    category.name
                ];

                var sql = 'insert into categories(name) values(?);';

                connection.query(sql, params, function (err, result) {
                    databaseHelper.closeConnection(connection);
                    if (err) {
                        console.log(err);
                        callback(new Error('Ошибка записи в БД'));
                        return;
                    }

                    category.category_id = result.insertId;

                    callback(null, category);
                });
            });
        }
    },
    editCategory: function (config, category, callback) {
        if (callback && typeof callback === 'function') {
            databaseHelper.getConnection(config, function (err, connection) {
                if (err) {
                    console.log(err);
                    callback(new Error('Ошибка соеденения с БД'));
                    return;
                }

                var params = [
                    category.name,
                    category.category_id
                ];

                var sql = 'update categories set name = ? where category_id = ?;';

                connection.query(sql, params, function (err) {
                    databaseHelper.closeConnection(connection);
                    if (err) {
                        console.log(err);
                        callback(new Error('Ошибка записи в БД'));
                        return;
                    }

                    callback(null, category);
                });
            });
        }
    }
}
