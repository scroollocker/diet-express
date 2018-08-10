app.controller('PatientsController', ['$scope', 'PatientFactory', '$location', function ($scope, PatientFactory, $location) {

    $scope.isLoading = false;

    $scope.patients = [];

    $scope.selectedPatient = null;

    $scope.editPatient = null;

    $scope.getPatients = function() {
        return $scope.patients;
    };

    $scope.hideToolbar = function() {
        if ($scope.selectedPatient) {
            $scope.selectedPatient.selected = false;
        }
        $scope.selectedPatient = null;
    };

    $scope.selectPatient = function(patient) {
        if ($scope.selectedPatient && $scope.selectedPatient.patient_id === patient.patient_id) {
            $scope.selectedPatient.selected = false;
            $scope.selectedPatient = null;
        }
        else {
            if ($scope.selectedPatient) {
                $scope.selectedPatient.selected = false;
            }
            $scope.selectedPatient = patient;
            $scope.selectedPatient.selected = true;
        }
    }

    $scope.showHistory = function() {
        var url = '/foods/' + $scope.selectedPatient.patient_id;
        $location.path(url);
        $location.replace();
    };

    $scope.onload = function () {
        $scope.isLoading = true;
        PatientFactory.getPatients(function (err, patients) {
            $scope.isLoading = false;
            if (err) {
                alert(err.message);
            }
            else {
                $scope.patients = patients;
            }
        })
    };

    $scope.addNew = function () {
        $scope.editPatient = null;
        jQuery('#patient-edit-dialog').modal('show');
    };

    $scope.edit = function () {

        $scope.editPatient = angular.copy($scope.selectedPatient);
        console.log($scope.editPatient);
        jQuery('#patient-edit-dialog').modal('show');
    };

    $scope.savePatient = function () {
        PatientFactory.modifyPatient($scope.editPatient, function (err, patient) {
            if (err) {
                alert(err.message);
                return;
            }

            if ($scope.selectedPatient) {
                $scope.selectedPatient.selected = false;
            }

            $scope.selectedPatient = patient;
            $scope.selectedPatient.selected = true;
            jQuery('#patient-edit-dialog').modal('hide');

            var found = false;
            $scope.getPatients().forEach(function (item, index) {
                if (item.patient_id == patient.patient_id) {
                    found = true;
                    $scope.patients[index] = patient;
                }
            });

            if (!found) {
                $scope.patients.push(patient);
            }

        });
    };

    $scope.disablePatient = function () {
        if ($scope.selectedPatient) {
            PatientFactory.disablePatient($scope.selectedPatient, function (err) {
                if (err) {
                    alert(err.message);
                }
                else {
                    $scope.selectedPatient.disable = 1;
                }
            })
        }
    };

    $scope.enablePatient = function () {
        if ($scope.selectedPatient) {
            PatientFactory.enablePatient($scope.selectedPatient, function (err) {
                if (err) {
                    alert(err.message);
                }
                else {
                    $scope.selectedPatient.disable = 0;
                }
            })
        }
    };

}]);