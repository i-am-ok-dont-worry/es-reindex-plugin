const { Creator, Manager } = require('mage2vuestorefront/src/watcher');

class ReindexUtils {
    constructor () {
        this._creator = new Creator();
        this._manager = new Manager();
    }

    enqueueReindex (entity, context) {
        const { ids, priority } = context;
        return this._creator.createReindexJob({ entity, ids, priority });
    }

    getStatus (entity, context) {
        const { ids } = context;
        return this._manager.isRunning(entity, ids);
    }

    /**
     * Validates reindex context
     * @param context
     */
    validateContext (context) {
        try {
            if (!context) throw new Error();
            if (typeof context === 'string') {
                JSON.parse(context);
            }
        } catch (e) {
            throw `Malformed body JSON: ${e}`
        }

        if (context.hasOwnProperty('ids')) {
            if (!(context.ids instanceof Array)) {
                throw `ids parameter should be an array of strings`;
            }
        }
    }
}

module.exports = new ReindexUtils();
