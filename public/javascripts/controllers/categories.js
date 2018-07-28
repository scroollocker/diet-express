app.controller('CategoriesController', ['$scope','CategoriesFactory', function ($scope, CategoriesFactory) {
    $scope.isLoading = false;

    $scope.categories = [];
    $scope.selectedCategory = null;

    $scope.editCategory = null;

    $scope.getCategories = function() {
        return $scope.categories;
    };

    $scope.hideToolbar = function() {
        if ($scope.selectedCategory) {
            $scope.selectedCategory.selected = false;
        }
        $scope.selectedCategory = null;
    };

    $scope.selectCategory = function(category) {
        if ($scope.selectedCategory && category.category_id == $scope.selectedCategory.category_id) {

                $scope.selectedCategory.selected = false;
                $scope.selectedCategory = null;


        }
        else {
            if ($scope.selectedCategory) {
                $scope.selectedCategory.selected = false;
            }
            $scope.selectedCategory = category;
            $scope.selectedCategory.selected = true;

        }

    }

    $scope.onload = function () {
        $scope.isLoading = true;

        CategoriesFactory.getAllCategories(function (err, categories) {
            $scope.isLoading = false;
            if (err) {
                alert(err.message);
                return;
            }

            $scope.categories = categories;
        });
    }

    $scope.addNew = function () {
        $scope.editCategory = null;
        jQuery('#category-edit-dialog').modal('show');
    }

    $scope.edit = function () {
        $scope.editCategory = angular.copy($scope.selectedCategory);
        jQuery('#category-edit-dialog').modal('show');
    }

    $scope.saveCategory = function () {
        CategoriesFactory.modifyCategory($scope.editCategory, function (err, category) {
            if (err) {
                alert(err.message);
                return;
            }

            if ($scope.selectedCategory) {
                $scope.selectedCategory.selected = false;
            }

            $scope.selectedCategory = category;
            $scope.selectedCategory.selected = true;

            jQuery('#category-edit-dialog').modal('hide');

            var found = false;
            $scope.categories.forEach(function (item, index) {
                if (item.category_id == category.category_id) {
                    $scope.categories[index] = category;
                    found = true;
                }
            });

            if (!found) {
                $scope.categories.push(category);
            }
        })
    }

}]);