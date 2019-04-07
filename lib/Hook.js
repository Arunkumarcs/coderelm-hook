const lodash = require('lodash')

class Hook
{
    constructor() 
    {
        this.tracker = {}
    }

    /**
     * Execute registered hook
     * @param {*} actionName 
     * @param {*} callback 
     * @param  {...any} par 
     */
    do(
        actionName, 
        callback = () => {}, 
        ...par
    ) {
        if (!this.isAction(actionName)) {
            return false
        }
        
        let action = this.tracker[actionName]
        for (const iterator of action) {
            iterator.callback(...par)
        }
        callback()
    }

    /**
     * Register a hook
     * @param {*} param0 
     */
    register({
        hook,
        callback,
        identifier,
        filename = "",
        priority = 100
    }) {
        if (hook === undefined || hook === "") {
            throw Error('hook has to be provided')
        }
        if (identifier === undefined || identifier === "") {
            throw Error('identifier has to be provided')
        }
        if (callback === undefined || callback === "") {
            throw Error('callback has to be provided and it has to be a function')
        }

        if (!this.isAction(hook)) {
            this.tracker[hook] = []
        }

        this.tracker[hook].push({
            callback,
            identifier,
            filename,
            priority
        })

        this.tracker[hook] = lodash.sortBy(
            this.tracker[hook],
            'priority'
        )
    }

    /**
     * Check Hook Exist
     * @param {*} actionName 
     */
    isAction(actionName) 
    {
        if (this.tracker[actionName] === undefined) {
            return false
        }
        return true
    }

    /**
     * Remove Hook
     * @param {*} actionName 
     */
    remove(actionName) 
    {
        if (this.isAction(actionName)) {
            delete this.tracker[actionName]
        }
    }

    /**
     * Remove Identifier from Hook
     * @param {*} actionName
     * @param {*} identifier
     */
    removeIndex(actionName, identifier)
    {
        if (
            this.isAction(actionName) 
        ) {
            this.tracker[actionName] = _.filter(
                this.tracker[actionName], 
                function (o) {
                    return o.identifier !== identifier;
                }
            );
        }
    }
}

module.exports = Hook

/*
console.log('sa')
let hk = new Hook()
hk.register({
    hook: "asd",
    callback: (e) => {
        console.log(e)
        console.log("cse")
    },
    identifier: "cse"
})
hk.register({
    hook: "asd",
    callback: (e, r) => {
        console.log(e)
        console.log(r)
        console.log("csea")
    },
    identifier: "csea",
    priority: 1
})
hk.register({
    hook: "asd2",
    callback: (e, r) => {
        console.log(e)
        console.log(r)
        console.log("csea")
    },
    identifier: "csea"
})


hk.do("asd", () => {
    console.log('completed')
},23, 434)

console.log(hk)



// module.exports = new Hook()
*/

/*
const _ = use('lodash')

module.exports = function () {
    return {
        action: {},
        doAction(actionName, ob = {}) {
            actionName = _.split(actionName, '|')

            if (this.action[actionName[0]] != undefined) {
                let callbacks = this.action[actionName[0]]

                for (const iterator of callbacks) {
                    ob = iterator.callback(ob)
                }

                if (actionName[1] != undefined) {
                    return _.get(ob, actionName[1]);
                } else {
                    return ob
                }
            } else {
                return ''
            }
        },
        registerAction({
            actionName,
            callback,
            identifier,
            filename = "",
            priority = 100
        }) {
            if (!this.isAction(actionName)) {
                this.action[actionName] = []
            }

            this.action[actionName].push({
                callback,
                identifier,
                filename,
                priority
            })
            this.action[actionName] = _.sortBy(this.action[actionName], 'priority')
        },
        isAction(actionName) {
            if (this.action[actionName] == undefined) {
                return false
            }
            return true
        },
        removeAction(actionName) {
            if (this.isAction(actionName)) {
                delete this.action[actionName]
            }
        },
        removeActionIndex(actionName, index) {
            if (this.isAction(actionName) &&
                this.action[actionName][index] != undefined
            ) {
                this.action[actionName].splice(index, 1);
            }
        }
    }
}
*/