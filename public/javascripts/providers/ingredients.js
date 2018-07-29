app.factory('IngredientsFactory', ['$http', function ($http) {

    return {
        getIngredients: function (callback) {
            if (callback && typeof callback === 'function') {
                $http.get('/ingredients/all').then(function (response) {
                    response = response.data;
                    if (response.status) {
                        callback(null, response.ingredients);
                    }
                    else {
                        callback(new Error(response.message))
                    }
                }, function (err) {
                    console.log(err);
                    callback(new Error('Произошла системная ошибка'));
                })
            }
        },
        modifyIngredient: function (ingredient, callback) {
            if (callback && typeof callback === 'function') {
                var request = ingredient;

                $http.post('/ingredients/modify', request).then(function (response) {
                    response = response.data;

                    if (response.status) {
                        callback(null, response.ingredient);
                    }
                    else {
                        callback(new Error(response.message));
                    }
                }, function (err) {
                    console.log(err);
                    callback(new Error('Произошла системная ошибка'));
                    return;

                })
            }
        },
        removeIngredient: function (ingredient, callback) {
            if (callback && typeof callback === 'function') {
                var request = ingredient;

                $http.post('/ingredients/remove', request).then(function (response) {
                   response = response.data;
                   if (response.status) {
                       callback(null);
                   }
                   else {
                       callback(new Error(response.message));
                   }
                }, function (err) {
                   console.log(err);
                   callback(new Error('Произошла системная ошибка'));
                });
            }
        }
    }

}]);