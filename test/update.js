
var ostore = require('..');
    
exports['update age'] = function (test) {
    var store = ostore.createStore();
    var adam = { name: 'Adam', age: 800 };
    store.put(1, adam);

    store.update(1, { age: 801 });

    var result = store.get(1);
    test.ok(result);
    test.equal(result.name, 'Adam');
    test.equal(result.age, 801);
}
