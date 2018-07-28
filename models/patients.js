
var databaseHelper = require('../helpers/database-helper');

module.exports = {
    getPatients: function (config, callback) {
        if (callback && typeof callback === 'function') {
            databaseHelper.getConnection(config, function (err, connection) {
               if (err) {
                   console.log(err);
                   callback(new Error('Ошибка при соединении с БД'));
                   return;
               }
               var sql = 'select * from patients order by disable asc, fio';
               connection.query(sql, function (err, result, fields) {
                   databaseHelper.closeConnection(connection);
                   if (err) {
                       console.log(err);
                       callback(new Error('Ошибка получения данных из БД'));
                       return;
                   }

                   callback(null, result);
               })
            });
        }
    },
    addPatient: function (config, patient, callback) {
        if (callback && typeof callback === 'function') {
            databaseHelper.getConnection(config, function (err, connection) {
                if (err) {
                    console.log(err);
                    callback(new Error('Ошибка соеденения с БД'));
                    return;
                }

                var params = [
                    patient.fio,
                    patient.age,
                    patient.weight,
                    patient.gender
                ];

                var sql = 'insert into patients(fio, age, weight, gender) values( ?, ?, ?, ?);';

                connection.query(sql, params, function (err, result) {
                    databaseHelper.closeConnection(connection);
                    if (err) {
                        console.log(err);
                        callback(new Error('Ошибка работы с БД'));
                        return;
                    }
                    patient.patient_id = result.insertId;

                    callback(null, patient);
                })
            })
        }
    },
    editPatient: function (config, patient, callback) {
        if (callback && typeof callback === 'function') {
            databaseHelper.getConnection(config, function (err, connection) {
               if (err) {
                   console.log(err);
                   callback(new Error('Ошибка соеденения с БД'));
                   return;
               }
               var params = [
                   patient.fio,
                   patient.age,
                   patient.weight,
                   patient.gender,
                   patient.patient_id
               ];

               var sql = 'update patients set fio = ?, age = ?, weight = ?, gender = ? where patient_id = ?;';

               connection.query(sql, params, function (err, result) {
                  databaseHelper.closeConnection(connection);
                  if (err) {
                      console.log(err);
                      callback('Ошибка обновления БД');
                      return;
                  }

                  callback(null, patient);
               });
            });
        }
    },
    disablePatient: function (config, patient, callback) {
        if (callback && typeof callback === 'function') {
            databaseHelper.getConnection(config, function (err, connection) {
                if (err) {
                    console.log(err);
                    callback(new Error('Ошибка соеденения с БД'));
                    return;
                }

                var params = [
                    patient.patient_id
                ];

                var sql = 'update patients set disable = 1 where patient_id = ?;';

                connection.query(sql, params, function (err, result) {
                    if (err) {
                        console.log(err);
                        callback(new Error('Ошибка обновления БД'));
                        return;
                    }
                    callback(null);
                })
            })
        }
    }
};