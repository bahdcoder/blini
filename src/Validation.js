
class Validation {
    /**
     * Create a validation from a function
     * @param {Function(value)} fn
     */

    constructor(fn) {
        this.fn = fn;
    }

    /**
     * Validate a value, throws and error if failed
     * @param {Mixed} value
     * @return {Mixed}
     */

    validate(value) {
        return this.fn(value);
    }

    /**
     * Enforce that a value is defined
     * @param {String} message
     * @return {Validation}
     */

    static required(message) {
        return new Validation(function(value) {
            if (typeof value === 'undefined') {
                throw new Error(message);
            }

            return value;
        });
    }

    /**
     * Default the value if non existant
     * @param {Mixed} defaultValue
     * @return {Validation}
     */

    static default(defaultValue) {
        return new Validation(function(value) {
            if (typeof value === 'undefined') {
                return defaultValue;
            }

            return value;
        });
    }

    /**
     * Enforce that the value has a length superior to "min"
     * @param {Number} min
     * @param {String} message
     * @return {Validation}
     */

    static minLength(min, message) {
        return new Validation(function(value) {
            if (value.length < min) {
                throw new Error(message);
            }

            return value;
        });
    }

    /**
     * Enforce that the value has a length inferior to "max"
     * @param {Number} max
     * @param {String} message
     * @return {Validation}
     */

    static maxLength(max, message) {
        return new Validation(function(value) {
            if (value.length > max) {
                throw new Error(message);
            }

            return value;
        });
    }

    /**
     * Enforce that the value match a RegExp
     * @param {RegExp} re
     * @param {String} message
     * @return {Validation}
     */

    static regExp(re, message) {
        return new Validation(function(value) {
            if (re.test(value)) {
                throw new Error(message);
            }

            return value;
        });
    }
}

module.exports = Validation;