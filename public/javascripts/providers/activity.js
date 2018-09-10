app.factory('ActivityProvider', ['$http', function($http) {
    
    return {
        getActivity: function(callback) {
            if (callback && typeof callback === 'function') {
                $http.get('/activity/all').then(function(response) {
                    response = response.data;
                    if (response.status) {
                        callback(null, response.activity);
                    }
                    else {
                        callback(new Error(response.message));
                    }
                }, function(err) {
                    console(err);
                    callback(new Error('Произошла системная ошибка'));
                })
            }
        },

        modifyActivity: function(data, callback) {
            if (callback && typeof callback === 'function') {
                $http.post('/activity/modify', data).then(function(response) {
                    response = response.data;
                    if (response.status) {
                        callback(null, response.activity);
                    } 
                    else {
                        callback(new Error(response.message));
                    }
                }, function(err) {
                    console.log(err);
                    callback(new Error('Произошла системная ошибка'));
                });
            }
        },

        deleteActivity: function(data, callback) {
            if (callback && typeof callback === 'function') {
                $http.post('/activity/remove', data).then(function(response) {
                    response = response.data;

                    if (response.status) {
                        callback(null);
                    }
                    else {
                        callback(new Error(response.message));
                    }
                }, function(err) {
                    console.log(err);
                    callback(new Error('Произошла системная ошибка'));
                });
            }
        }
    }
}]);