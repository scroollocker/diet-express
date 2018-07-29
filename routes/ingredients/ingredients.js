const express = require('express');
const router = express.Router();

const ingredientsModel = require('../../models/ingredients');
const validatorHelper = require('../../helpers/validator-helper');
const validator = require('Validator');

router.get('/all', function (req, res, next) {
    ingredientsModel.getAllIngredients(req.environment.database, function (err, ingredients) {
        if (err) {
            res.send({
                status: false,
                message: err.message
            })
        }
        else {
            res.send({
                status: true,
                ingredients: ingredients
            })
        }
    });
});

router.post('/modify', function (req, res, next) {
    var data = req.body;

    var rules = {
        ingredient_name: 'required',
        category_id: 'required|integer'
    };

    if (data.voda && data.voda !== undefined) {
        rules.voda = 'numeric';
    }
    if (data.belok && data.belok !== undefined) {
        rules.belok = 'numeric';
    }
    if (data.jir && data.jir !== undefined) {
        rules.jir = 'numeric';
    }
    if (data.uglevod && data.uglevod !== undefined) {
        rules.uglevod = 'numeric';
    }
    if (data.hloridy && data.hloridy !== undefined) {
        rules.hloridy = 'numeric';
    }
    if (data.kletchatka && data.kletchatka !== undefined) {
        rules.kletchatka = 'numeric';
    }
    if (data.krahmal && data.krahmal !== undefined) {
        rules.krahmal = 'numeric';
    }
    if (data.pektin && data.pektin !== undefined) {
        rules.pektin = 'numeric';
    }
    if (data.org_kisloty && data.org_kisloty !== undefined) {
        rules.org_kisloty = 'numeric';
    }
    if (data.zola && data.zola !== undefined) {
        rules.zola = 'numeric';
    }
    if (data.kaliy && data.kaliy !== undefined) {
        rules.kaliy = 'numeric';
    }
    if (data.kalciy && data.kalciy !== undefined) {
        rules.kalciy = 'numeric';
    }
    if (data.magniy && data.magniy !== undefined) {
        rules.magniy = 'numeric';
    }
    if (data.natriy && data.natriy !== undefined) {
        rules.natriy = 'numeric';
    }
    if (data.fosfor && data.fosfor !== undefined) {
        rules.fosfor = 'numeric';
    }
    if (data.zhelezo && data.zhelezo !== undefined) {
        rules.zhelezo = 'numeric';
    }
    if (data.yod && data.yod !== undefined) {
        rules.yod = 'numeric';
    }
    if (data.kobalt && data.kobalt !== undefined) {
        rules.kobalt = 'numeric';
    }
    if (data.marganec && data.marganec !== undefined) {
        rules.marganec = 'numeric';
    }
    if (data.med && data.med !== undefined) {
        rules.med = 'numeric';
    }
    if (data.malibden && data.malibden !== undefined) {
        rules.malibden = 'numeric';
    }
    if (data.ftor && data.ftor !== undefined) {
        rules.ftor = 'numeric';
    }
    if (data.cink && data.cink !== undefined) {
        rules.cink = 'numeric';
    }
    if (data.aretinol && data.aretinol !== undefined) {
        rules.aretinol = 'numeric';
    }
    if (data.bkarotin && data.bkarotin !== undefined) {
        rules.bkarotin = 'numeric';
    }
    if (data.etokoferol && data.etokoferol !== undefined) {
        rules.etokoferol = 'numeric';
    }
    if (data.caskorbinka && data.caskorbinka !== undefined) {
        rules.caskorbinka = 'numeric';
    }
    if (data.b1 && data.b1 !== undefined) {
        rules.b1 = 'numeric';
    }
    if (data.b2 && data.b2 !== undefined) {
        rules.b2 = 'numeric';
    }
    if (data.bc && data.bc !== undefined) {
        rules.bc = 'numeric';
    }
    if (data.pp && data.pp !== undefined) {
        rules.pp = 'numeric';
    }
    if (data.kkal && data.kkal !== undefined) {
        rules.kkal = 'numeric';
    }
    if (data.perevar && data.perevar !== undefined) {
        rules.perevar = 'numeric';
    }
    if (data.okislenie && data.okislenie !== undefined) {
        rules.okislenie = 'numeric';
    }
    if (data.ingredient_id && data.ingredient_id !== undefined) {
        rules.ingredient_id = 'integer';
    }

    var messages = {
        numeric: 'Поле :attr должно быть числовым',
        integer: 'Поле :attr дожно быть числовым',
        required: 'Поле :attr обязательно'
    }

    var fields = {
        ingredient_name: 'Название',
        category_id:'Категория',
        voda: 'Вода',
        belok: 'Белок',
        jir:'Жиры',
        uglevod:'Углеводы',
        hloridy:'Хлориды',
        kletchatka:'Клетчатка',
        krahmal:'Крахмал',
        pektin:'Пектин',
        org_kisloty:'Орг. кислоты',
        zola:'Зола',
        kaliy:'Калий',
        kalciy:'Кальций',
        magniy:'Магний',
        natriy:'Натрий',
        fosfor:'Фосфор',
        zhelezo:'Железо',
        yod:'Йод',
        kobalt:'Кобальт',
        marganec:'Марганец',
        med:'Медь',
        malibden:'Молибден',
        ftor:'Фтор',
        cink:'Цинк',
        aretinol:'А',
        bkarotin:'В',
        etokoferol:'Е',
        caskorbinka:'С',
        b1:'В1',
        bc:'ВС',
        b2:'В2',
        pp:'РР',
        kkal:'Каллорийность',
        perevar:'Время переваривания',
        okislenie:'Окисление',
        ingredient_id:'ID Ингредиента'
    }

    //console.log(data,rules, messages, fields);

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
        var resultFunc = function (err, ingredient) {
            if (err) {
                res.send({
                    status: false,
                    message: err.message
                });
                return;
            }

            res.send({
                status: true,
                ingredient: ingredient
            });
        };

        if (data.ingredient_id &&  data.ingredient_id !== undefined) {
            ingredientsModel.editIngredient(req.environment.database, data, resultFunc);
        }
        else {
            ingredientsModel.addIngredient(req.environment.database, data, resultFunc);
        }
    }

});

router.post('/remove', function (req, res, next) {
    var data = req.body;

    var rules = {
        ingredient_id: 'required|integer'
    }

    var message = {
        required: 'Поле :attr обязательно для заполнения',
        integer: 'Поле :attr должно быть числом'
    }

    var fields = {
        ingredient_id: 'ID Ингредиента'
    }

    var v = validator.make(data, rules, message, fields);

    if (v.fails()) {
        var error = v.getErrors();
        var errMsg = validatorHelper.errorToString(error);

        res.send({
            status: false,
            message: errMsg
        });
    }
    else {
        ingredientsModel.removeIngredient(req.environment.database, data, function (err) {
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
        })
    }
})

module.exports = router;