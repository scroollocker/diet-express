
var express = require('express');
var router = express.Router();

var categoryModel = require('../../models/categories');
var validator = require('Validator');
var validatorHelper = require('../../helpers/validator-helper');

router.get('/all', function (req, res, next) {
    categoryModel.getCategories(req.environment.database, function (err, categories) {
       if (err) {
           res.send({
               status: false,
               message: err.message
           });
           return;
       }
       res.send({
           status: true,
           categories: categories
       });
    });
});

router.post('/modify', function (req, res, next) {
    var data = req.body;

    var rules = {
        name: 'required'
    };

    if (data.category_id && data.category_id !== undefined) {
        rules.category_id = 'integer|required';
    }

    var messages = {
        required: 'Поле :attr обязательно к заполнению',
        integer: 'Поле :attr должно быть целым числом'
    };

    var fields = {
        name: 'Название категории',
        category_id: 'ID категории'
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

    var resultFunc = function (err, category) {
        if (err) {
            res.send({
                status: false,
                message: err.message
            });
        }
        else {
            res.send({
                status: true,
                category: category
            });
        }
    };

    if (data.category_id !== undefined) {
        categoryModel.editCategory(req.environment.database, data, resultFunc);
    }
    else {
        categoryModel.addCategory(req.environment.database, data, resultFunc);
    }

});

module.exports = router;