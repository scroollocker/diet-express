app.controller('ActivityCalculatorController', ['$scope', 'ActivityProvider','PatientFactory', function ($scope, ActivityProvider, PatientFactory) {

    $scope.edit_activity = null;
    $scope.calc_activity = null;
    $scope.selectedActivity = null;
    $scope.activity_data = [];
    $scope.patients_data = [];
    $scope.isActivityLoading = false;
    $scope.calculatedActivities = [];
    $scope.showCalculated = false;
    $scope.resultActivity = null;
    $scope.isEdit = false;

    $scope.calculation = null;

    $scope.hoursArray = [];
    $scope.sixthArray = [];

    $scope.hideToolbar = function() {
        if ($scope.selectedActivity) {
            $scope.selectedActivity.selected = false;
        }
        $scope.selectedActivity = null;
    };

    $scope.selectActivity = function(item) {
        if ($scope.selectedActivity && item.category_id == $scope.selectedActivity.category_id) {

            $scope.selectedActivity.selected = false;
            $scope.selectedActivity = null;
        }
        else {

            if ($scope.selectedActivity) {
                $scope.selectedActivity.selected = false;
            }
            $scope.selectedActivity = item;
            $scope.selectedActivity.selected = true;

        }

    };

    $scope.getActivityData = function() {
        return $scope.activity_data;
    };

    $scope.getPatientsData = function() {
        return $scope.patients_data;
    }

    $scope.getCalculatedActivities = function () {
        return $scope.calculatedActivities;
    };

    $scope.toFixed = function(val) {
        return parseFloat(val).toFixed(2);
    }

    $scope.loadActivities = function () {
        $scope.isActivityLoading = true;
        ActivityProvider.getActivity(function (err, activities) {
            $scope.isActivityLoading = false;

            if (err) {
                alert(err.message);
                return;
            }

            $scope.activity_data = activities;
        });
    };

    $scope.loadPatients = function() {
        $scope.patients_data = [];
        PatientFactory.getActivePatients(function(err, patients) {
            if (err) {
                alert(err.message);
            }
            else {
                $scope.patients_data = patients;
            }
        });
    }

    $scope.add = function() {
        $('#add-activity-dialog').modal('show');
        $scope.edit_activity = null;
        $scope.isEdit = false;
    };

    $scope.calcWin = function() {
        $scope.loadPatients();
        $scope.calculation = null;
        $('#add-activity-calc').modal('show');
    }

    $scope.calculate = function() {
        var calories = 0;
        var time = 0;
        $scope.getCalculatedActivities().forEach(function (item) {
            calories += item.calories;
            time += item.time;
        });

        $scope.resultActivity = {
            calories: calories,
            time: time
        };

        $scope.showCalculated = true;

    };

    $scope.calcRe = function() {
        $scope.calculation = null;
        if ($scope.calc_activity.a_var && $scope.calc_activity.b_var) {
            var a = parseFloat($scope.calc_activity.a_var);
            var b = parseFloat($scope.calc_activity.b_var);
            if (isNaN(a) || isNaN(b)) {
                alert('Введеные значения должны быть числами');
            }
            else {
                var summ = a + b;
                var precent = summ * 0.1;
                var sre = $scope.resultActivity.calories + summ + precent;
                $scope.calculation = {
                    oo: summ,
                    sdd: precent,
                    sre: sre
                };
            }

        }
        else {
            alert('Введите число А и число В');
        }
    }

    $scope.edit = function() {
        if ($scope.selectedActivity) {
            var time = $scope.timeToHhmmss($scope.selectedActivity.time);
            $scope.edit_activity = {
                activity: $scope.selectedActivity.activity,
                hours: time.hours,
                minutes: time.minutes,
                seconds: time.seconds
            }
            $scope.selectedActivity.selected = false;
            $scope.selectedActivity = null;
            $('#add-activity-dialog').modal('show');
            $scope.isEdit = true;
        }
    };

    $scope.delete = function() {
        if ($scope.selectedActivity) {
            $scope.selectedActivity.selected = false;

            $scope.calculatedActivities.forEach(function (item, index) {
                if (item.id === $scope.selectedActivity.id) {
                    $scope.calculatedActivities.splice(index, 1);
                }
            });

            $scope.selectedActivity = null;
            $scope.calculate();
        }
    };

    $scope.saveActivity = function(activity) {
        var time = 0;
        if (activity.hours) {
            time += activity.hours * (3600);
        }
        if (activity.minutes) {
            time += activity.minutes * 60;
        }
        if (activity.seconds) {
            time += activity.seconds;
        }

        console.log(activity);

        if (time === 0) {
            alert('Активность не должна длиться 0 секунд');
            return;
        }

        var calories = (activity.activity.calorie * time) / 3600;

        var calculated = {
            activity: activity.activity,
            id: activity.activity.activity_id,
            name: activity.activity.activity_name,
            time: time,
            calories: calories
        };

        if (!$scope.isEdit) {
            $scope.calculatedActivities.push(calculated);
        }
        else {
            $scope.calculatedActivities.forEach(function (item, index) {
                if (item.id === calculated.id) {
                    $scope.calculatedActivities[index] = calculated;
                }
            });
        }
        $('#add-activity-dialog').modal('hide');
        $scope.showCalculated = false;
        $scope.calculate();

    };

    $scope.timeToStr = function(time) {
        var hours   = Math.floor(time / 3600);
        var minutes = Math.floor((time - (hours * 3600)) / 60);
        var seconds = time - (hours * 3600) - (minutes * 60);

        return ""+hours + "ч. "+minutes + "м. " + seconds + "c.";
    };

    $scope.timeToHhmmss = function(time) {
        var hours   = Math.floor(time / 3600);
        var minutes = Math.floor((time - (hours * 3600)) / 60);
        var seconds = time - (hours * 3600) - (minutes * 60);

        return {
            hours: hours === 0 ? undefined : hours,
            minutes: minutes === 0 ? undefined : minutes,
            seconds: seconds === 0 ? undefined : seconds
        }
    };

    $scope.onLoad = function () {
        $scope.loadActivities();
        for (var i = 1; i < 24; i++) {
            $scope.hoursArray.push(i);
        }
        for (var i = 1; i < 60; i++) {
            $scope.sixthArray.push(i);

        }
    }
}]);