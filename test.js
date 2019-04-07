let {
    Series, 
    Parallel
} = require('./index')

Series.register({
    hook: "t1",
    identifier: "i1",
    callback() {
        console.log('t1 -> i1 -> c1')
    }
})
Series.register({
    hook: "t1",
    identifier: "i2",
    callback() {
        console.log('t1 -> i1 -> c1')
    }
})

console.log(Series)