const {Record, Map} = require('immutable');

const DEFAULTS = {
    // Mongo connection
    connection: null,
    // Options
    options:    new Map()
};

/**
 * Query constructor used for building MongoDB queries.
 */
class Query extends Record(DEFAULTS) {
    constructor(connection) {
        super({
            connection: connection
        });
    }

    /**
     * Execute a query and returns its result
     * @return {Promise}
     */

    exec() {
        return new Promise(function(resolve, reject) {

        });
    }
}

module.exports = Query;