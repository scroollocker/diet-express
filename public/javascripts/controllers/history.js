app.controller('HistoryController', ['$scope', '$routeParams', '$location', 'HistoryFactory', function ($scope, $routeParams, $location, HistoryFactory) {

    $scope.patient_id = $routeParams.patientId;
    $scope.selectedFood = null;

    $scope.foods = [];

    $scope.isLoading = false;

    $scope.hideToolbar = function() {
        if ($scope.selectedFood) {
            $scope.selectedFood.selected = false;
        }
        $scope.selectedFood = null;
    };

    $scope.selectFood = function(food) {
        if ($scope.selectedFood && food.food_id == $scope.selectedFood.food_id) {

            $scope.selectedFood.selected = false;
            $scope.selectedFood = null;
        }
        else {
            if ($scope.selectedFood) {
                $scope.selectedFood.selected = false;
            }
            $scope.selectedFood = food;
            $scope.selectedFood.selected = true;

        }

    };

    $scope.view = function() {
        jQuery('#view-dialog').modal('show');
    };

    $scope.remove = function() {
        HistoryFactory.removeFood($scope.selectedFood, function (err) {
            if (err) {
                alert(err.message);
                return;
            }

            $scope.foods.forEach(function (item, index) {
                if (item.food_id == $scope.selectedFood.food_id) {
                    $scope.foods.splice(index, 1);
                }
            });
            $scope.hideToolbar();
        })
    };

    $scope.getFoods = function() {
        return $scope.foods;
    };

    $scope.filterItems = function() {
        var dateStart = jQuery('#date_from').val();
        var dateEnd = jQuery('#date_to').val();

        if (dateStart && dateEnd) {
            var momentStart = moment(dateStart, 'YYYY-MM-DD');
            var momentEnd = moment(dateEnd, 'YYYY-MM-DD');

            console.log(dateStart, dateEnd);

            if (!momentStart.isValid()) {
                alert('Дата начала ошибочная');
            }
            else if (!momentEnd.isValid()) {
                alert('Дата окончания ошибочная');
            }
            else if (!momentStart.isBefore(momentEnd, 'day')) {
                alert('Дата начала должна быть меньше даты окончания')
            }
            else {
                $scope.loadFoods();
            }
        }
        else {
            alert('Выберите дату')
        }
    }

    $scope.toNormalDate = function(date) {
        return moment(date).format('DD.MM.YYYY');
    }

    $scope.loadFoods = function() {
        var request = {
            patient_id: $scope.patient_id
        };

        var dateStart = jQuery('#date_from').val();
        var dateEnd = jQuery('#date_to').val();

        if (dateStart && dateEnd) {
            request.date_start = dateStart;
            request.date_end = dateEnd;
        }

        $scope.foods = [];
        $scope.isLoading = true;
        HistoryFactory.getFoodByPatien(request, function (err, foods) {
            $scope.isLoading = false;
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

        jQuery('#date_from').datetimepicker({
            format: 'DD.MM.YYYY'
        });

        jQuery('#date_to').datetimepicker({
            format: 'DD.MM.YYYY'
        });

        $scope.loadFoods();
    }

}]);