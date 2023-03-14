const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function registerValidation(data) {
    let errors = {};
    for (let key in data) {
        data[key] = !isEmpty(data[key]) ? data[key] : '';
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    // // Email validation
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // Password validation
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    return { errors, isValid: isEmpty(errors) };
}