# Hook
Hook scs= attached objects and reports back the linked changes.

## Installation
##### npm 
```
    npm i @arunkumarcoderelm/watcher
```

##### yarn 
```
    yarn add @arunkumarcoderelm/watcher
```

## Example

```javascript
    let watcher = require('@arunkumarcoderelm/hook') 
    let watchObj = new watcher()

    let p1 = { a: "sdfsef" }
    let p2 = { d3: "23qw3"}

    // Your Tracker function
    watchObj.tracker = function(name, obj, pro, oldVal, newVal) {
        console.log(name)
        console.log(pro)
        console.log(oldVal)
        console.log(newVal)
        console.log(this)
    }

    // Creating Proxy for Objects
    p1 = watchObj.createProxy(p1, "p1")
    p2 = watchObj.createProxy(p2, "p2")

    // watchObj.tracker will emit on each update
    p1.d3 = "sadfsdf"  
    p2.d1 = "sadfsdf" 
```

## API
#### `createProxy(element, name)`
Creates proxy object that will be tracked by watcher.

`element` : The object to be watched.
`name` : The identifier for the proxy object.


#### `tracker(name, obj, pro, oldVal, newVal)`
The method get triggered on every chnages in the attached proxy object.

`name`: Proxy object identifier.
`obj`: Proxy object itself.
`pro`: Property in proxy object.
`oldVal`: Old value in the proxy object property.
`newVal`: New updated value in the proxy object property.