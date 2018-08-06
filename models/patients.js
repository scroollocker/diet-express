
var databaseHelper = require('../helpers/database-helper');
var moment = require('moment');

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
    },
    enablePatient: function (config, patient, callback) {
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

                var sql = 'update patients set disable = 0 where patient_id = ?;';

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
    },
    getPatientsActive: function (config, callback) {
        if (callback && typeof callback === 'function') {
            databaseHelper.getConnection(config, function (err, connection) {
                if (err) {
                    console.log(err);
                    callback(new Error('Ошибка при соединении с БД'));
                    return;
                }
                var sql = 'select * from patients where disable = 0 order by fio';
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
    savePatientFoods: function (config, data, callback) {
        if (callback && typeof callback === 'function') {
            databaseHelper.getConnection(config, function (err, connection) {
                if (err) {
                    console.log(err);
                    callback(new Error('Ошибка при соеденении с БД'));
                    return;
                }

                var sql = 'INSERT INTO foods (`patient_id`,`date`,`voda`,`belok`,`jir`,`uglevod`,`hloridy`,`kletchatka`,`krahmal`,`pektin`,`org_kisloty`,`zola`,`kaliy`,`kalciy`,`magniy`,`natriy`,`fosfor`,`zhelezo`,`yod`,`kobalt`,`marganec`,`med`,`malibden`,`ftor`,`cink`,`aretinol`,`bkarotin`,`etokoferol`,`caskorbinka`,`b1`,`b2`,`bc`,`pp`,`kkal`,`perevar`,`okislenie`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';

                var params = [
                    data.patient_id,
                    moment(data.date, 'DD.MM.YYYY').toDate(),
                    data.voda,
                    data.belok,
                    data.jir,
                    data.uglevod,
                    data.hloridy,
                    data.kletchatka,
                    data.krahmal,
                    data.pektin,
                    data.org_kisloty,
                    data.zola,
                    data.kaliy,
                    data.kalciy,
                    data.magniy,
                    data.natriy,
                    data.fosfor,
                    data.zhelezo,
                    data.yod,
                    data.kobalt,
                    data.marganec,
                    data.med,
                    data.malibden,
                    data.ftor,
                    data.cink,
                    data.aretinol,
                    data.bkarotin,
                    data.etokoferol,
                    data.caskorbinka,
                    data.b1,
                    data.b2,
                    data.bc,
                    data.pp,
                    data.kkal,
                    data.perevar,
                    data.okislenie
                ];

                connection.query(sql, params, function (err, result) {
                    databaseHelper.closeConnection(connection);
                    if (err) {
                        console.log(err);
                        callback(new Error('Ошибка при добавлении записи в БД'));
                        return;
                    }

                    data.food_id = result.insertId;

                    callback(null, data);
                });
            })
        }
    },

    removePatientFood: function (config, data, callback) {
        if (callback && typeof callback === 'function') {
            databaseHelper.getConnection(config, function (err, connection) {
                if (err) {
                    console.log(err);
                    callback(new Error('Ошибка соеденения с БД'));
                    return;
                }

                var sql = 'delete from foods where food_id = ?;';

                var params = [
                    data.food_id
                ];

                connection.query(sql, params, function (err) {
                    databaseHelper.closeConnection(connection);
                    if (err) {
                        console.log(err);
                        callback(new Error('Ошибка удаления записи из БД'));
                        return;
                    }

                    callback(null);
                });
            })
        }
    },
    getAllPatientFood: function (config, patient, callback) {
        if (callback && typeof callback === "function") {
            databaseHelper.getConnection(config, function (err, connection) {
                if (err) {
                    console.log(err);
                    callback(new Error('Ошибка соеденения с БД'));
                    return;
                }

                var sql = 'select f.*, p.fio as patient_fio from foods as f inner join patients as p on p.patient_id = f.patient_id  where f.patient_id = ? and f.date between ? and ?;';

                var params = [
                    patient.patient_id
                ];

                if (patient.date_start && patient.date_start !== undefined) {
                    params.push(moment(patient.date_start,'DD.MM.YYYY').toDate());
                    params.push(moment(patient.date_end, 'DD.MM.YYYY').toDate());
                }
                else {
                    var start = ' 00:00:00';
                    var end = ' 23:59:59';
                    var now = moment().format('DD.MM.YYYY');
                    var dateStart = moment(now + start, 'DD.MM.YYYY HH:mm:ss').toDate();
                    var dateEnd = moment(now + end, 'DD.MM.YYYY HH:mm:ss').toDate();
                    params.push(dateStart);
                    params.push(dateEnd);
                }

                connection.query(sql, params, function (err, result) {
                    databaseHelper.closeConnection(connection);
                    if (err) {
                        console.log(err);
                        callback(new Error('Ошибка получения данных от БД'));
                        return;
                    }

                    callback(null, result);
                });
            })
        }
    }
};