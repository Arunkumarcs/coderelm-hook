const Series = require('./lib/Series')
const Parallel = require('./lib/Parallel')

/**
 * 
 */
// module.exports = {
//     Series,
//     Parallel
// }

Series.register({
    hook: "hook1",
    identifier: "id1",
    async callback(next, parm) {
        console.log('t1 -> i1 -> c1')
        parm.t = 24324
        next(null)
    }
})
Series.register({
    hook: "t1",
    identifier: "id2",
    async callback(next, parm) {
        console.log(parm)
        console.log('t1 -> i2 -> c2')
        next(null)
    }
})

let obj = {
    ok: "SAdas"
}
Series.do('t1', (err, result, parm) => {
    console.log(parm)
}, obj)
Series.do('t1', (err, result, parm) => {
    console.log(parm)
})
// console.log(Series)