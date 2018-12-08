app.controller('IngredientsController', ['$scope', 'IngredientsFactory', 'CategoriesFactory', function ($scope, IngredientsFactory, CategoriesFactory) {
    
    $scope.isLoading = false;
    $scope.modalLoading = false;

    $scope.ingredients = [];
    $scope.categories = [];
    
    $scope.selectedIngredient = null;
    $scope.editIngredient = null;
    
    $scope.getIngredients = function () {
        return $scope.ingredients;
    };

    $scope.getCategories = function() {
        return $scope.categories;
    };
    
    $scope.hideToolbar = function () {
        if ($scope.selectedIngredient) {
            $scope.selectedIngredient.selected = false;
            $scope.selectedIngredient = null;
        }
    };
    
    $scope.selectIngredient = function (ingredient) {
        if ($scope.selectedIngredient && ingredient.ingredient_id == $scope.selectedIngredient.ingredient_id) {
            $scope.selectedIngredient.selected = false;
            $scope.selectedIngredient = null;
        }
        else {
            if ($scope.selectedIngredient) {
                $scope.selectedIngredient.selected = false;
            }
            $scope.selectedIngredient = ingredient;
            $scope.selectedIngredient.selected = true;
        }

    };



    $scope.onload = function() {
        $scope.isLoading = true;
        IngredientsFactory.getIngredients(function (err, ingredients) {
            $scope.isLoading = false;
            if (err) {
                alert(err.message);
                return;
            }

            $scope.ingredients = ingredients;
        })
    };
    
    $scope.edit = function () {
        $scope.categories = [];
        CategoriesFactory.getAllCategories(function (err, categories) {

            if (err) {
                alert(err.message);
                return;
            }

            $scope.categories = categories;
            $scope.editIngredient = angular.copy($scope.selectedIngredient);
            console.log($scope.editIngredient);
            jQuery('#ingredient-edit-dialog').modal('show');
        })

    };
    
    $scope.addNew = function () {
        $scope.categories = [];
        CategoriesFactory.getAllCategories(function (err, categories) {

            if (err) {
                alert(err.message);
                return;
            }

            $scope.categories = categories;
            $scope.editIngredient = null;
            jQuery('#ingredient-edit-dialog').modal('show');
        })

    };
    
    $scope.remove = function () {
        IngredientsFactory.removeIngredient($scope.selectedIngredient, function (err) {
            if (err) {
                alert(err.message);
                return;
            }

            $scope.ingredients.forEach(function (item, index) {
                if (item.ingredient_id == $scope.selectedIngredient.ingredient_id) {
                    $scope.ingredients.splice(index, 1);
                }
            });
            $scope.selectedIngredient.selected = false;
            $scope.selectedIngredient = null;

        })
    };

    $scope.saveIngredient = function () {
        IngredientsFactory.modifyIngredient($scope.editIngredient, function (err, ingredient) {

            if (err) {
                alert(err.message);
                return;
            }

            $scope.categories.forEach(function (item) {
                if (item.category_id == ingredient.category_id) {
                    ingredient.category_name = item.name;
                }
            });

            if ($scope.selectedIngredient) {
                $scope.selectedIngredient.selected = false;
                $scope.selectedIngredient = null;
            }
            
            $scope.selectIngredient(ingredient);

            jQuery('#ingredient-edit-dialog').modal('hide');

            var found = false;
            $scope.ingredients.forEach(function (item, index) {
                if (item.ingredient_id == ingredient.ingredient_id) {
                    $scope.ingredients[index] = ingredient;
                    found = true;
                }
            });

            if (!found) {
                $scope.ingredients.push(ingredient);
            }
        })
    }
    
}]);