app.factory('HistoryFactory', ['$http', function ($http) {

    return {
        getFoodByPatien: function (data, callback) {
            if (callback && typeof callback === 'function') {
                var url = '/patients/food/'+data.patient_id;

                if (data.date_start && data.date_start !== undefined) {
                    url += '/?dateStart='+data.date_start;
                }

                if (data.date_end && data.date_end !== undefined) {
                    url += '&dateEnd='+data.date_end;
                }

                $http.get(url).then(function (response) {
                    response = response.data;
                    if (response.status) {
                        callback(null, response.foods);
                    }
                    else {
                        callback(new Error(response.message));
                    }
                }, function (err) {

                    console.log(err);
                    callback(new Error('Произошла системная ошибка'));

                });
            }
        },
        removeFood: function (data, callback) {
            if (callback && typeof callback === 'function') {
                var url = '/patients/removeFood';
                var request = data;

                $http.post(url, request).then(function (response) {
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
                })
            }
        }
    }

}]);