var express = require('express');
var router = express.Router();
var validator = require('Validator');
var validatorHelper = require('../../helpers/validator-helper');

var patientModel = require('../../models/patients');

/* GET home page. */
router.get('/all', function(req, res, next) {
    patientModel.getPatients(req.environment.database, function (err, patients) {
        if (err) {
            res.send({
                status: false,
                message: err.message
            });
        }
        else {
            res.send({
               status: true,
               patients: patients
            });
        }
    })
});

router.post('/modify', function (req, res, next) {
    var data = req.body;

    var rules = {
        fio: 'required',
        gender: 'required'
    };

    if (data.age && data.age !== undefined) {
        rules.age = 'integer';
    }
    if (data.weight && data.weight !== undefined) {
        rules.weight = 'integer';
    }
    if (data.patient_id && data.patient_id !== undefined) {
        rules.patient_id = 'integer';
    }

    var messages = {
        required: 'Поле :attr обязательно к заполнению',
        integer: 'Поле :attr должно быть целым числом'
    };

    var fields = {
        fio: 'ФИО',
        age: 'Возраст',
        weight: 'Вес',
        gender: 'Пол',
        patient_id: 'ID пациента'
    };

    var v = validator.make(data,rules, messages, fields);

    if (v.fails()) {
        var errors = v.getErrors();
        var errMsg = validatorHelper.errorToString(errors);
        res.send({
            status: false,
            message: errMsg
        });
    }
    else {
        var resultFun = function (err, patient) {
            if (err) {
                res.send({
                    status: false,
                    message: err.message
                });
                return;
            }
            res.send({
                status: true,
                patient: patient
            });
        };

        if (data.patient_id !== undefined) {
            patientModel.editPatient(req.environment.database, data, resultFun);
        }
        else {
            patientModel.addPatient(req.environment.database, data, resultFun);
        }
    }
});

router.post('/remove', function (req, res, next) {
    var data = req.body;

    var rules = {
        patient_id: 'required|integer'
    };

    var messages = {
        required: 'Поле :attr обязательно к заполнению',
        integer: 'Поле :attr должно быть целым числом'
    };

    var fields = {
        patient_id: 'ID пациента'
    };

    var v = validator.make(data,rules, messages, fields);

    if (v.fails()) {
        var errors = v.getErrors();
        var errMsg = validatorHelper.errorToString(errors);
        res.send({
            status: false,
            message: errMsg
        });
    }
    else {
        var resultFun = function (err) {
            if (err) {
                res.send({
                    status: false,
                    message: err.message
                });
                return;
            }
            res.send({
                status: true
            });
        };

        patientModel.disablePatient(req.environment.database, data, resultFun);
    }
});

module.exports = router;