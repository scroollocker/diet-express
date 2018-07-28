app.factory('CategoriesFactory', ['$http', function ($http) {

    return {
        getAllCategories: function (callback) {
            if (callback && typeof callback === 'function') {
                $http.get('/categories/all').then(function (response) {
                    response = response.data;

                    if (response.status) {
                        callback(null, response.categories);
                    }
                    else {
                        callback(new Error(response.message));
                    }

                }, function (err) {
                    console.log(err);
                    callback(new Error('Произошла системная ошибка'));
                })
            }
        },
        modifyCategory: function (category, callback) {
            if (callback && typeof callback === 'function') {
                var request = category;

                $http.post('/categories/modify', request).then(function (response) {
                    response = response.data;
                    if (response.status) {
                        callback(null, response.category);
                    }
                    else {
                        callback(new Error(response.message));
                    }
                }, function (err) {
                    console.log(err);
                    callback(new Error('Произошла системная ошибка'));
                })
            }
        }
    }
}]);