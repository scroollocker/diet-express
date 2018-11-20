app.controller('HistoryController', ['$scope', '$routeParams', '$location', 'HistoryFactory', function ($scope, $routeParams, $location, HistoryFactory) {

    $scope.patient_id = $routeParams.patientId;
    $scope.selectedFood = null;
    $scope.edit_regimen = null;
    $scope.kkalSum = 0;

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
            $scope.calculateKkal();
            $scope.hideToolbar();
        })
    };

    $scope.edit = function() {
        $scope.edit_regimen = {
            food_id: $scope.selectedFood.food_id,
            regimen: $scope.selectedFood.regimen_code
        }
        $('#change-regemen-dialog').modal('show');
    };

    $scope.saveRegimen = function(regimen) {
        HistoryFactory.saveRegimen(regimen, function(err) {
            if (err) {
                alert(err.message);
            }
            else {
                $scope.selectedFood.regimen_code = regimen.regimen;
                $('#change-regemen-dialog').modal('hide');
            }
        });
    };

    $scope.getFoods = function() {
        return $scope.foods;
    };

    $scope.filterItems = function() {
        var dateStart = jQuery('#date_from').val();
        var dateEnd = jQuery('#date_to').val();

        if (dateStart && dateEnd) {
            var chDateS = dateStart + ' 00:00:00';
            var chDateE = dateEnd + ' 23:59:59';
            var momentStart = moment(chDateS, 'YYYY-MM-DD HH:mm:ss');
            var momentEnd = moment(chDateE, 'YYYY-MM-DD HH:mm:ss');

            console.log(dateStart, dateEnd);

            if (!momentStart.isValid()) {
                alert('Дата начала ошибочная');
            }
            else if (!momentEnd.isValid()) {
                alert('Дата окончания ошибочная');
            }
            else if (!momentStart.isBefore(momentEnd, 'second')) {
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

    $scope.regimenToStr = function(regimen) {
        switch(regimen) {
            case 'BREAKFAST': return 'Завтрак'
            case 'LUNCH': return 'Обед'
            case 'DINNER': return 'Ужин'
            default: return '';
        }
    }

    $scope.getPercentage = function(val) {
        if (val == 0) {
            return 0;
        }
        if ($scope.kkal == 0) {
            return 0;
        }
        return (parseFloat(val) * 100 / $scope.kkalSum).toFixed(2);
    }

    $scope.calculateKkal = function() {
        $scope.kkalSum = 0;
        $scope.foods.forEach(function(item) {
            $scope.kkalSum += parseFloat(item.kkal);
        });
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
                $scope.calculateKkal();
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