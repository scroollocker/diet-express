var databaseHelper = require('../helpers/database-helper');

module.exports = {
    getActivity: function(config, callback) {
        if (callback && typeof callback === 'function') {
            databaseHelper.getConnection(config, function(err, connection) {
                if (err) {
                    console.log(err);
                    callback(new Error('Ошибка при соеденении с БД'));
                    return;
                }

                var sql = 'select * from activity;';

                connection.query(sql, function(err, result) {
                    databaseHelper.closeConnection(connection);
                    if (err) {
                        console.log(err);
                        callback(new Error('Ошибка при получении данных из БД'));
                        return;
                    }
                    callback(null, result);
                });
            });
        }
    },
    addActivity: function(config, data, callback) {
        if (callback && typeof callback === 'function') {
            databaseHelper.getConnection(config, function(err, connection) {
                if (err) {
                    console.log(err);
                    callback(new Error('Ошибка соеденения с БД'));
                    return;
                }
                var sql = 'insert into activity (`activity_name`, `calorie`) values (?, ?);';

                var params = [
                    data.activity_name,
                    data.calorie
                ];

                connection.query(sql, params, function(err, result) {
                    databaseHelper.closeConnection(connection);
                    if (err) {
                        console.log(err);
                        callback(new Error('Ошибка добавления записи в БД'));
                        return;
                    }
                    var insertId = result.insertId;

                    data.activity_id = insertId;

                    callback(null, data);
                });
            });
        }
    },
    updateActivity: function(config, data, callback) {
        if (callback && typeof callback === 'function') {
            databaseHelper.getConnection(config, function(err, connection) {
                if (err) {
                    console.log(err);
                    callback(new Error('Ошибка при соеденении с БД'));
                    return;
                }
                
                var sql = 'update activity set `activity_name` = ?, `calorie` = ? where `activity_id` = ?;';

                var params = [
                    data.activity_name,
                    data.calorie,
                    data.activity_id
                ];

                connection.query(sql, params, function(err) {
                    databaseHelper.closeConnection(connection);
                    if (err) {
                        console.log(err);
                        callback('Ошибка при обновлении записи');
                        return;
                    }
                    
                    callback(null, data);
                });
            });
        }
    },
    deleteActivity: function(config, data, callback) {
        if (callback && typeof callback === 'function') {
            databaseHelper.getConnection(config, function(err, connection) {
                if (err) {
                    console.log(err);
                    callback(new Error('Ошибка соеденения с БД'));
                    return;
                }
                var sql = 'delete from `activity` where `activity_id` = ?;';

                var params = [
                    data.activity_id
                ];

                connection.query(sql, params, function(err) {
                    databaseHelper.closeConnection(connection);
                    if (err) {
                        console.log(err);
                        callback(new Error('Ошибка БД при удалении записи'));
                        return;
                    }
                    callback(null);
                });
            });
        }
    }
}