const Promise = require('q');
const Immutable = require('immutable');

const DEFAULTS = {
    // Previous version of the document remotly
    __prevRevision: null
};

const Document = {
    DEFAULTS,

    /**
     * Get the schema for this document
     * @return {Schema} schema
     */

    getSchema() {
        return this.constructor.schema;
    },

    /**
     * Get the connection for this document
     * @return {Connection} connection
     */

    getConnection() {
        return this.constructor.connection;
    },

    /**
     * Get the name of the collection
     * @return {String} collection
     */

    getCollectionName() {
        return this.constructor.collection;
    },

    /**
     * Validate this document against the schema.
     * @return {Promise<Document>}
     */

    validate() {
        const schema = this.getSchema();
        return schema.validate(this);
    },

    /**
     * Save the document to mongo DB
     * @return {Promise<Document>}
     */

    save() {
        const doc = this;

        return this.constructor.getCollection()
        .then(function(col) {
            const json = doc.toMongo();

            return Promise.nfcall(col.save.bind(col), json);
        })
        .then(function() {
            return doc.cleanup();
        });
    },

    /**
     * Remove the document
     * @return {Promise}
     */

    remove() {
        return this.constructor.remove({
            _id: this._id
        });
    },

    /**
     * Cleanup a document by removing all pending revions
     * @return {Document}
     */

    cleanup() {
        return this.merge({
            __prevRevision: null
        });
    },

    /**
     * Test whaever the document exists remotly
     * @return {Boolean} clean
     */

    isSaved() {
        return Boolean(this.get('_id'));
    },

    /**
     * Test whaever the document is clean (nothing to save)
     * @return {Boolean} clean
     */

    isClean() {
        const savedRevision = this.__prevRevision;

        if (!this.isSaved()) {
            return false;
        }

        if (!savedRevision) {
            return true;
        }

        return Immutable.is(
            savedRevision.remove('__prevRevision'),
            this.remove('__prevRevision')
        );
    },

    /**
     * Return the MongoDB representation of this document
     * @return {JSON} json
     */

    toMongo() {
        const schema = this.getSchema();
        return schema.toMongo(this);
    }
};

module.exports = Document;
