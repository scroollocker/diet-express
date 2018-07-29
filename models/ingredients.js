const databaseHelper = require('../helpers/database-helper');

module.exports = {
    getAllIngredients: function (config, callback) {
        if (callback && typeof callback === 'function') {
            databaseHelper.getConnection(config, function (err, connection) {
                if (err) {
                    console.log(err);
                    callback(new Error('Ошибка соеденения с БД'));
                    return;
                }

                const sql = 'SELECT a.*, b.name as category_name FROM diet.ingredients as a inner join categories as b on a.category_id = b.category_id order by ingredient_name;';

                connection.query(sql, function (err, results, fields) {
                    databaseHelper.closeConnection(connection);
                    if (err) {
                        console.log(err);
                        callback(new Error('Ошибка получения данных из БД'));
                        return;
                    }

                    callback(null, results);
                });
            })
        }
    },
    addIngredient: function (config, ingredient, callback) {
        if (callback && typeof callback === 'function') {
            databaseHelper.getConnection(config, function (err, connection) {
                if (err) {
                    console.log(err);
                    callback(new Error('Ошибка соеденения с БД'));
                    return;
                }

                var sql = 'INSERT INTO `ingredients` (`ingredient_name`, `category_id`, `voda`, `belok`, `jir`, `uglevod`, `hloridy`, `kletchatka`, `krahmal`, `pektin`, `org_kisloty`, `zola`, `kaliy`, `kalciy`, `magniy`, `natriy`, `fosfor`, `zhelezo`, `yod`, `kobalt`, `marganec`, `med`, `malibden`, `ftor`, `cink`, `aretinol`, `bkarotin`, `etokoferol`, `caskorbinka`, `b1`, `bc`, `b2`, `pp`, `kkal`, `perevar`, `okislenie`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
                var params = [
                    ingredient.ingredient_name,
                    ingredient.category_id,
                    ingredient.voda,
                    ingredient.belok,
                    ingredient.jir,
                    ingredient.uglevod,
                    ingredient.hloridy,
                    ingredient.kletchatka,
                    ingredient.krahmal,
                    ingredient.pektin,
                    ingredient.org_kisloty,
                    ingredient.zola,
                    ingredient.kaliy,
                    ingredient.kalciy,
                    ingredient.magniy,
                    ingredient.natriy,
                    ingredient.fosfor,
                    ingredient.zhelezo,
                    ingredient.yod,
                    ingredient.kobalt,
                    ingredient.marganec,
                    ingredient.med,
                    ingredient.malibden,
                    ingredient.ftor,
                    ingredient.cink,
                    ingredient.aretinol,
                    ingredient.bkarotin,
                    ingredient.etokoferol,
                    ingredient.caskorbinka,
                    ingredient.b1,
                    ingredient.bc,
                    ingredient.b2,
                    ingredient.pp,
                    ingredient.kkal,
                    ingredient.perevar,
                    ingredient.okislenie
                ];

                connection.query(sql, params, function (err, result) {
                    databaseHelper.closeConnection(connection);
                    if (err) {
                        console.log(err);
                        callback(new Error('Ошибка обновления данных БД'));
                        return;
                    }

                    ingredient.ingredient_id = result.insertId;

                    callback(null, ingredient);
                })
            })
        }
    },
    editIngredient: function (config, ingredient, callback) {
        if (callback && typeof callback === 'function') {
            databaseHelper.getConnection(config, function (err, connection) {
                if (err) {
                    console.log(err);
                    callback(new Error('Ошибка соеденения с БД'));
                    return;
                }

                var sql = 'update `ingredients` set `ingredient_name` = ?, `category_id` = ?, `voda` = ?, `belok` = ?, `jir` = ?, `uglevod` = ?, `hloridy` = ?, `kletchatka` = ?, `krahmal` = ?, `pektin` = ?, `org_kisloty` = ? , `zola` = ?, `kaliy` = ?, `kalciy` = ?, `magniy` = ?, `natriy` = ?, `fosfor` = ?, `zhelezo` = ?, `yod` = ?, `kobalt` = ?, `marganec` = ?, `med` = ?, `malibden` = ?, `ftor` = ?, `cink` = ?, `aretinol` = ?, `bkarotin` = ?, `etokoferol` = ?, `caskorbinka` = ?, `b1` = ?, `bc` = ?, `b2` = ?, `pp` = ?,  `kkal` = ?, `perevar` = ?, `okislenie` = ? where `ingredient_id` = ?;';
                var params = [
                    ingredient.ingredient_name,
                    ingredient.category_id,
                    ingredient.voda,
                    ingredient.belok,
                    ingredient.jir,
                    ingredient.uglevod,
                    ingredient.hloridy,
                    ingredient.kletchatka,
                    ingredient.krahmal,
                    ingredient.pektin,
                    ingredient.org_kisloty,
                    ingredient.zola,
                    ingredient.kaliy,
                    ingredient.kalciy,
                    ingredient.magniy,
                    ingredient.natriy,
                    ingredient.fosfor,
                    ingredient.zhelezo,
                    ingredient.yod,
                    ingredient.kobalt,
                    ingredient.marganec,
                    ingredient.med,
                    ingredient.malibden,
                    ingredient.ftor,
                    ingredient.cink,
                    ingredient.aretinol,
                    ingredient.bkarotin,
                    ingredient.etokoferol,
                    ingredient.caskorbinka,
                    ingredient.b1,
                    ingredient.bc,
                    ingredient.b2,
                    ingredient.pp,
                    ingredient.kkal,
                    ingredient.perevar,
                    ingredient.okislenie,
                    ingredient.ingredient_id
                ];

                connection.query(sql, params, function (err, result) {
                    databaseHelper.closeConnection(connection);
                    if (err) {
                        console.log(err);
                        callback(new Error('Ошибка обновления данных БД'));
                        return;
                    }


                    callback(null, ingredient);
                })
            })
        }
    },
    removeIngredient: function (config, ingredient, callback) {
        if (callback && typeof callback === 'function') {
            databaseHelper.getConnection(config, function (err, connection) {
               if (err) {
                   console.log(err);
                   callback(new Error('Произошла ошибка при соеденении с БД'));
                   return;
               }

               var param = [
                   ingredient.ingredient_id
               ];

               var sql = 'delete from ingredients where ingredient_id = ?;';

               connection.query(sql, param, function (err) {
                   databaseHelper.closeConnection(connection);
                   if (err) {
                       console.log(err);
                       callback(new Error('Ошибка при обработке данных'));
                       return;
                   }

                   callback(null);
               })
            });
        }
    }
}
