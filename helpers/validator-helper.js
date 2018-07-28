module.exports = {
    errorToString:  function(errors) {
        if (!errors) return '';
        var errMsg = '';

        var errKeys = Object.keys(errors);

        errKeys.forEach(function (err) {
             errors[err].forEach(function (message) {
                  errMsg += ' | ' + message;
             });
        });

        return errMsg;
    }
}