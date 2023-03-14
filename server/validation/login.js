const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function registerValidation(data) {
    let errors = {};
    for (let key in data) {
        data[key] = !isEmpty(data[key]) ? data[key] : '';
    }

    // Email validation
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // Password validation
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };

}