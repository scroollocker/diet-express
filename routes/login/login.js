var express = require('express');
var router = express.Router();
var validator = require('Validator');
var validatorHelper = require('../../helpers/validator-helper');
var userModel = require('../../models/users');
var session = require('express-session');

router.get('/', function(req, res, next) {

    res.render('login');
});

router.post('/', function (req, res, next) {

    var data = req.body;

    var rules = {
        username: 'required',
        password: 'required'
    };

    var fields = {
        username: 'Имя пользователя',
        password: 'Пароль'
    };

    var messages = {
        'required': 'Поле :attr не заполнено'
    };

    var v = validator.make(data, rules, messages, fields);

    if (v.fails()) {
        var errors = v.getErrors();
        var errMsg = validatorHelper.errorToString(errors);

        res.render('login', {
            error: errMsg
        });
    }
    else {
        if (userModel.auth(req.environment.database, data, function (err, user) {
            if (err) {
                res.render('login', {
                    error: err.message
                });
            }
            else {
                req.user = user;
                req.session.user = user;
                res.redirect('/');
            }
        }));
    }


});

module.exports = router;
