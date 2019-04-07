const Hook = require('./Hook')
const asyncNpm = require('async')

class Series extends Hook
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
        parm = {},
    ) {
        if (!this.isAction(actionName)) {
            return false
        }

        let action = this.tracker[actionName]
        let newObj = {}

        for (const iterator of action) {
            newObj[iterator.identifier] = (next) => {
                iterator.callback(next, parm)
            }
        }
        // console.log(newObj)
        asyncNpm.series(
            newObj,
            (err, result) => {
                callback(err, result, parm)
            }
        );
    }
}

module.exports = new Series()