var express = require('express');
var router = express.Router();
var validator = require('Validator');
var validatorHelper = require('../../helpers/validator-helper');
var moment = require('moment');

var patientModel = require('../../models/patients');

var validateValidMoment = function (name, value, params) {
    if (value && value !== '') {
        var date = moment(value, 'DD.MM.YYYY');

        return date.isValid();
    }
    else {
        return false;
    }
}

router.get('/all', function(req, res, next) {
    patientModel.getPatients(req.environment.database, req.user.user_id, function (err, patients) {
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

router.get('/active', function(req, res, next) {
    patientModel.getPatientsActive(req.environment.database,req.user.user_id, function (err, patients) {
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

router.post('/saveFood', function (req, res, next) {
    var data = req.body;

    var rules = {
        patient_id: 'required|integer',
        date: 'required|validmoment'
    };

    var messages = {
        required: ':attr обязательно для заполнения',
        integer: ':attr должно быть целым числом'
    };

    var fields = {
        patient_id: 'ID пациента',
        date: 'Дата'
    };

    var v = validator.make(data, rules, messages, fields);

    v.extend('validmoment', validateValidMoment, 'Поле :attr должно быть правильной датой');

    if (v.fails()) {
        var errors = v.getErrors();

        var errStr = validatorHelper.errorToString(errors);

        res.send({
            status: false,
            message: errStr
        });
        return;
    }

    patientModel.savePatientFoods(req.environment.database, data, function (err) {
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
    });
});

router.get('/food/:patientId', function (req, res, next) {
    var data = {
        patient_id: req.params.patientId,
        date_start: req.query.dateStart,
        date_end: req.query.dateEnd
    };

    var rules = {
        patient_id: 'required|integer'
    };

    if (data.date_start && data.date_start !== undefined) {
        rules.date_start = 'required|validmoment';
        rules.date_end = 'required|validmoment';
    }

    var messages = {
        required: ':attr обязателен для заполнения',
        integer: ':attr должен быть числом'
    };

    var fields = {
        patient_id: 'ID Пациента',
        date_start: 'Дата с',
        date_end: 'Дата по'
    };

    var v = validator.make(data, rules, messages, fields);
    v.extend('validmoment', validateValidMoment, ':attr должен быть верной датой');

    if (v.fails()) {
        var errors = v.getErrors();

        var errMsg = validatorHelper.errorToString(errors);

        res.send({
            status: false,
            message: errMsg
        });
        return;
    }

    patientModel.getAllPatientFood(req.environment.database, data, function (err, foods) {
        if (err) {
            res.send({
                status: false,
                message: err.message
            });
            return;
        }

        res.send({
            status: true,
            foods: foods
        });
    });
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
            
            patientModel.editPatient(req.environment.database, data, req.user.user_id, resultFun);
        }
        else {
            
            patientModel.addPatient(req.environment.database, data, req.user.user_id, resultFun);
        }
    }
});

router.post('/removeFood', function (req, res, next) {
    var data = req.body;

    var rules = {
        food_id: 'required|integer'
    };

    var messages = {
        required: 'Поле :attr обязательно к заполнению',
        integer: 'Поле :attr должно быть числом'
    };

    var fields = {
        food_id: 'ID записи'
    };

    var v = validator.make(data, rules, messages, fields);

    if (v.fails()) {
        var errors = v.getErrors();

        var errMsg = validatorHelper.errorToString(errors);

        res.send({
            status: false,
            message: errMsg
        });
        return;
    }

    patientModel.removePatientFood(req.environment.database, data, function (err) {
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
    });
});

router.post('/enable', function (req, res, next) {
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
        patientModel.enablePatient(req.environment.database, data, function (err) {
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
        });
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

router.post('/modifyRegimen', function(req, res, next) {
    var data = req.body;
    var rules = {
        food_id: 'required',
        regimen: 'required'
    };
    var messages = {
        required: 'Поле :attr обязательное'
    };
    var fields = {
        food_id: 'ID записи',
        regimen: 'Режим'
    };

    var v = validator.make(data, rules, messages, fields);

    if (v.fails()) {
        var errors = v.getErrors();
        var errMsg = validatorHelper.errorToString(errors);
        res.send({
            status: false,
            message: errMsg
        });
    }
    else {
        patientModel.modifyRegimen(req.environment.database, data, function(err) {
            if (err) {
                res.send({
                    status: false,
                    message: err.message
                });
            }
            else {
                res.send({
                    status: true
                })
            }
        });
    }
});

module.exports = router;