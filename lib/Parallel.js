const Hook = require('./Hook')
const asyncNpm = require('async')
class Parallel extends Hook
{
    /**
     * Execute registered hook
     * @param {*} actionName 
     * @param {*} callback 
     * @param  {...any} par 
     */
    do(
        actionName,
        callback = () => {},
        par = {},
    ) {
        if (!this.isAction(actionName)) {
            return false
        }

        let action = this.tracker[actionName]
        let newObj = {}

        for (const iterator of action) {
            newObj[iterator.identifier] = (next) => {
                iterator.callback(next, par)
            }
        }
        asyncNpm.parallel(
            newObj,
            callback
        );
    }
}

module.exports = new Parallel()