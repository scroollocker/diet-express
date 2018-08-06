app.controller('HistoryController', ['$scope', '$routeParams', '$location', 'HistoryFactory', function ($scope, $routeParams, $location, HistoryFactory) {

    $scope.patient_id = $routeParams.patientId;

    $scope.foods = [];

    $scope.getFoods = function() {
        return $scope.foods;
    };

    $scope.loadFoods = function() {
        var request = {
            patient_id: $scope.patient_id
        };


        $scope.foods = [];
        HistoryFactory.getFoodByPatien(request, function (err, foods) {
            if (err) {
                alert(err.message);
            }
            else {
                $scope.foods = foods;
            }
        });
    };

    $scope.onload = function () {
        if ($scope.patient_id === null || $scope.patient_id === undefined) {
            $location.path('/patients');
            $location.replace();
            return;
        }

        $scope.loadFoods();
    }

}]);