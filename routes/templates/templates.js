var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main/main');
});

router.get('/patients', function(req, res, next) {
    res.render('patients/main');
});

router.get('/categories', function (req, res, next) {
    res.render('categories/main');
});

router.get('/ingredients', function (req, res, next) {
    res.render('ingredients/main');
});

router.get('/calculator', function (req, res, next) {
    res.render('calculator/main');
});

router.get('/foods', function (req, res, next) {
    res.render('foods/foods');
});

module.exports = router;
