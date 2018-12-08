const express = require('express');

const router = express.Router();
const activityModel = require('../../models/activity');
const validatorHelper = require('../../helpers/validator-helper');

const validator = require('Validator');

router.get('/all/:category', function(req, res, next) {
    
    activityModel.getActivity(req.environment.database, req.params.category, function(err, activity) {
        if (err) {
            res.send({
                status: false,
                message: err.message
            });
            return;
        }

        res.send({
            status: true,
            activity: activity
        });
    });
});

router.post('/modify', function(req, res, next) {
    var data = req.body;

    var rules = {
        activity_name: 'required',
        calorie: 'required|numeric'
    };

    if (data.activity_id) {
        rules.activity_id = 'required|integer';
    }

    var messages = {
        'required': 'Поле :attr обязательно к заполнению',
        'numeric': 'Поле :attr должно быть числом',
        'integer': 'Поле :attr должно быть целым числом'
    };

    var fields = {
        activity_name: 'Название активности',
        calorie: 'Калорийность',
        activity_id: 'ID актвности'
    };

    var v = validator.make(data, rules, messages, fields);

    if (v.fails()) {
        var errors = v.getErrors();

        var errorMessages = validatorHelper.errorToString(errors);

        res.send({
            status: false,
            message: errorMessages
        });

        return;
    }

    var callback = function(err, activity) {
        if (err) {
            res.send({
                status: false,
                message: err.message
            });
        }
        else {
            res.send({
                status: true,
                activity: activity
            });
        }
    };

    if (data.activity_id) {
        activityModel.updateActivity(req.environment.database, data, callback);
    }
    else {
        activityModel.addActivity(req.environment.database, data, callback);
    }
    
});

router.post('/remove', function(req, res, next) {
    var data = req.body;

    var rules = {
        activity_id: 'required|integer'
    };

    var messages = {
        required: 'Поле :attr обязательно для заполнения',
        integer: 'Поле :attr должно быть целым числом'
    };

    var fields = {
        activity_id: 'ID активности'
    };

    var v = validator.make(data, rules, messages, fields);

    if (v.fails()) {
        var errors = v.getErrors();
        var errorMessages = validatorHelper.errorToString(errors);

        res.send({
            status: false,
            message: errorMessages
        });

        return;
    }

    activityModel.deleteActivity(req.environment.database, data, function(err) {
        if (err) {
            res.send({
                status: false,
                message: err.message
            });
        }
        else {
            res.send({
                status: true
            });
        }
    });
});

module.exports = router;