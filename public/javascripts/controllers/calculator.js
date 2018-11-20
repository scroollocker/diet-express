app.controller('CalculatorController', ['$scope', 'IngredientsFactory', 'PatientFactory', '$location', function ($scope, IngredientsFactory, PatientFactory, $location) {
    $scope.foods = [];
    $scope.ingredients = [];
    $scope.editFood = null;
    $scope.showCalculated = false;
    $scope.calculatedIngredient = {};

    $scope.activePatients = [];

    $scope.onload = function() {
        jQuery('#select-date').datetimepicker({
            format: 'DD.MM.YYYY'
        });
    };

    $scope.getFoods = function () {
        return $scope.foods;
    };

    $scope.getIngredients = function () {
        return $scope.ingredients;
    };

    $scope.getPatients = function() {
        return $scope.activePatients;
    };

    $scope.addNew = function () {
        $scope.ingredients = [];

        IngredientsFactory.getIngredients(function (err, ingredients) {
            if (err) {
                alert(err.message);
            }
            else {
                $scope.ingredients = ingredients;
                $scope.editFood = {};
                $scope.editFood.ingredients = [];

                jQuery('#calculator-dialog').modal('show');
            }
        })

    };

    $scope.addIngredient = function (ingredient) {

        $scope.editFood.ingredients.push({
            ingredient: ingredient,
            count: ''
        });

        $scope.ingredients.forEach(function (item, index) {
            if (item.ingredient_id == ingredient.ingredient_id) {
                $scope.ingredients.splice(index, 1);
            }
        });

    }

    $scope.removeIngredient = function (ingredient) {
        $scope.ingredients.push(ingredient.ingredient);

        $scope.editFood.ingredients.forEach(function (item, index) {
            if (item.ingredient.ingredient_id == ingredient.ingredient.ingredient_id) {
                $scope.editFood.ingredients.splice(index, 1);
            }
        });
    }

    $scope.saveFood = function () {
        if ($scope.editFood.ingredients.length === 0) {
            alert('Не выбраны ингредиенты');
            return;
        }

        console.log($scope.editFood);

        if ($scope.editFood.ingredients.length === 1) {
            $scope.editFood.name = $scope.editFood.ingredients[0].ingredient.ingredient_name;
            // $scope.editFood.count = $scope.editFood.ingredients[0].count;
        }

        $scope.foods.push($scope.editFood);
        $scope.editFood = null;

        console.log($scope.foods);

        jQuery('#calculator-dialog').modal('hide');

        $scope.showCalculated = false;

    };

    $scope.removeFood = function (index) {
        $scope.foods.forEach(function (item, i) {
            if (i == index) {
                $scope.foods.splice(i, 1);
            }
        });

        $scope.showCalculated = false;
    };

    $scope.openSaveDialog = function() {
        if ($scope.foods.length > 0 && $scope.showCalculated) {
            $scope.activePatients = [];
            PatientFactory.getActivePatients(function (err, patients) {
                if (err) {
                    alert(err.message);
                }
                else {
                    $scope.activePatients = patients;
                    jQuery('#save-dialog').modal('show');
                }
            });


        }
    };

    $scope.saveToUser = function(patient) {
        var request = $scope.calculatedIngredient;
        request.patient_id = patient.patient_id;
        request.regimen_code = $scope.selectedRegimen;

        var date = jQuery('#select-date').val();
        if (!date || date == '') {
            alert('Требуется выбрать дату');
            return;
        }

        request.date = date;

        PatientFactory.saveFood(request, function (err) {
            if (err) {
                alert(err.message);
            }
            else {
                jQuery('#save-dialog').modal('hide');
                var url = '/foods/' + request.patient_id;
                $location.path(url);
                $location.replace();
            }

        })
    };

    $scope.calcIfNotNull = function (count, item) {
        var result = 0;
        if (item && item !== '' && count && count !== '') {
            var res = parseFloat(item) * (parseFloat(count) / 100);
            console.log(res);
            return res;
        }

        return result;
    };



    $scope.calculate = function () {
        var ingredientSum = {};

        ingredientSum.voda = 0;
        ingredientSum.belok = 0;
        ingredientSum.jir = 0;
        ingredientSum.uglevod = 0;
        ingredientSum.hloridy = 0;
        ingredientSum.kletchatka = 0;
        ingredientSum.krahmal = 0;
        ingredientSum.pektin = 0;
        ingredientSum.org_kisloty = 0;
        ingredientSum.zola = 0;
        ingredientSum.kaliy = 0;
        ingredientSum.kalciy = 0;
        ingredientSum.magniy = 0;
        ingredientSum.natriy = 0;
        ingredientSum.fosfor = 0;
        ingredientSum.zhelezo = 0;
        ingredientSum.yod = 0;
        ingredientSum.kobalt = 0;
        ingredientSum.marganec = 0;
        ingredientSum.med = 0;
        ingredientSum.malibden = 0;
        ingredientSum.ftor = 0;
        ingredientSum.cink = 0;
        ingredientSum.aretinol = 0;
        ingredientSum.bkarotin = 0;
        ingredientSum.etokoferol = 0;
        ingredientSum.caskorbinka = 0;
        ingredientSum.b1 = 0;
        ingredientSum.bc = 0;
        ingredientSum.b2 = 0;
        ingredientSum.pp = 0;
        ingredientSum.kkal = 0;
        ingredientSum.perevar = 0;
        ingredientSum.okislenie = 0;

        if ($scope.foods.length > 0) {
            $scope.foods.forEach(function (item) {
                if (item.ingredients && item.ingredients.length > 0) {
                    item.ingredients.forEach(function (ingredient) {
                        ingredientSum.voda += parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.voda));
                        ingredientSum.belok +=  parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.belok));
                        ingredientSum.jir += parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.jir));
                        ingredientSum.uglevod +=  parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.uglevod));
                        ingredientSum.hloridy +=  parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.hloridy));
                        ingredientSum.kletchatka +=  parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.kletchatka));
                        ingredientSum.krahmal +=  parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.krahmal));
                        ingredientSum.pektin +=  parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.pektin));
                        ingredientSum.org_kisloty +=  parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.org_kisloty));
                        ingredientSum.zola +=  parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.zola));
                        ingredientSum.kaliy +=  parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.kaliy));
                        ingredientSum.kalciy +=  parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.kalciy));
                        ingredientSum.magniy +=  parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.magniy));
                        ingredientSum.natriy +=  parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.natriy));
                        ingredientSum.fosfor +=  parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.fosfor));
                        ingredientSum.zhelezo +=  parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.zhelezo));
                        ingredientSum.yod +=  parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.yod));
                        ingredientSum.kobalt +=  parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.kobalt));
                        ingredientSum.marganec += parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.marganec));
                        ingredientSum.med += parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.med));
                        ingredientSum.malibden += parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.malibden));
                        ingredientSum.ftor +=  parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.ftor));
                        ingredientSum.cink += parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.cink));
                        ingredientSum.aretinol += parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.aretinol));
                        ingredientSum.bkarotin += parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.bkarotin));
                        ingredientSum.etokoferol += parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.etokoferol));
                        ingredientSum.caskorbinka += parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.caskorbinka));
                        ingredientSum.b1 += parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.b1));
                        ingredientSum.bc += parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.bc));
                        ingredientSum.b2 += parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.b2));
                        ingredientSum.pp += parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.pp));
                        ingredientSum.kkal += parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.kkal));
                        ingredientSum.perevar += parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.perevar));
                        ingredientSum.okislenie += parseFloat($scope.calcIfNotNull(ingredient.count, ingredient.ingredient.okislenie));
                        console.log(ingredientSum);
                    })
                }

            });

        }
        $scope.showCalculated = true;

        console.log(ingredientSum);

        $scope.calculatedIngredient = ingredientSum;
    }


}]);