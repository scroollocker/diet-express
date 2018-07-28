app.factory('PatientFactory', ['$http', function ($http) {

    var getPatients = function (callback) {
        if (callback && typeof callback === 'function') {
            $http.get('/patients/all').then(function (response) {
                response = response.data;

                if (response.status == true) {
                    callback(null, response.patients);
                }
                else {
                    callback(new Error(response.message));
                }
            }, function (err) {
                console.log(err);
                callback(new Error('Произошла системная ошибка'));
            })
        }
    };

    var modifyPatient  = function (patient, callback) {
        if (callback && typeof callback === 'function') {
            var request = patient;

            $http.post('/patients/modify', request).then(function (response) {
                response = response.data;

                if (response.status) {
                    callback(null, response.patient);
                }
                else {
                    callback(new Error(response.message));
                }
            }, function (err) {
                console.log(err);
                callback(new Error('Произошла системная ошибка'));
            });
        }
    };

    var disablePatient = function (patient, callback) {
        if (callback && typeof callback === 'function') {
            var request = patient;

            $http.post('/patients/remove', request).then(function (response) {
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

    return {
        getPatients: getPatients,
        modifyPatient: modifyPatient,
        disablePatient: disablePatient
    }

}]);