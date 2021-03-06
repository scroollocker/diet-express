app.controller('ActivityController', ['$scope', 'ActivityProvider', '$routeParams', function($scope, ActivityProvider, $routeParams) {

    
    $scope.edit_activity = {};
    $scope.selectedActivity = null;
    $scope.activity_data = [];
    $scope.isActivityLoading = false;
    $scope.saveActivityBtnLoading = false;
    $scope.activityCategory = '1';

    $scope.isActive = function(category) {
        return $scope.activityCategory === category;
    }

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

    }

    $scope.getActivityData = function() {
        return $scope.activity_data;
    }

    $scope.getActivityText = function(category) {
        console.log(category);
        switch(category) {
            default:
            case '1': {
                return 'Кал. в час';
            }
            case '2': {
                return 'Кал. в минуту';
            }
        }
    }

    $scope.onLoad = function() {
        var category = $routeParams.category;
        if (category) {
            $scope.activityCategory = category;
        }
        else {
            $scope.activityCategory = 1;
        }
        $scope.loadActivity();
    }

    $scope.loadActivity = function() {
        $scope.isActivityLoading = true;
        ActivityProvider.getActivity($scope.activityCategory, function(err, activity) {
            $scope.isActivityLoading = false;

            if (err) {
                alert(err.message);
                return;
            }

            $scope.activity_data = activity;
        });
    }

    $scope.add = function() {
        
        $scope.edit_activity = {};

        $('#add-activity-dialog').modal('show');
    }

    $scope.edit = function() {
        $scope.edit_activity = angular.copy($scope.selectedActivity);

        $('#add-activity-dialog').modal('show');
    }

    $scope.saveActivity = function(activity) {
        if ($scope.add_activity_form.$valid) {
            $scope.saveActivityBtnLoading = true;
            activity.category = $scope.activityCategory;

            ActivityProvider.modifyActivity($scope.edit_activity, function(err, activity) {
                $scope.saveActivityBtnLoading = false;

                if (err) {
                    alert(err.message);
                    return;
                }

                if ($scope.edit_activity.activity_id) {
                    $scope.activity_data.forEach(function(item, index) {
                        if (item.activity_id == $scope.edit_activity.activity_id) {
                            $scope.activity_data[index] = activity;
                        }
                    });
                }
                else {
                    $scope.activity_data.push(activity);
                }

                $('#add-activity-dialog').modal('hide');
            });

        }
        else {
            alert('Проверьте корректность заполненных полей');
        }
    }

    $scope.delete = function() {
        if ($scope.selectedActivity) {
            console.log($scope.selectedActivity);
            ActivityProvider.deleteActivity($scope.selectedActivity, function(err) {
                if (err) {
                    alert(err.message);
                }
                else {
                    $scope.activity_data.forEach(function(item, index) {
                        if (item.activity_id == $scope.selectedActivity.activity_id) {
                            $scope.activity_data.splice(index, 1);
                        }
                    });
                    
                    $scope.hideToolbar();
                }
            });
        }
    }

}]);