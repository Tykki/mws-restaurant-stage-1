var idb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open (or create) the database
var open = idb.open("MyDatabase", 2);

// Create the schema
open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("restaurant-data", {keyPath: "id"});
    var index = store.createIndex("nameIndex", "name");
};

open.onsuccess = function() {
    // Start a new transaction
    var db = open.result;
    var tx = db.transaction("restaurant-data", "readwrite");
    var store = tx.objectStore("restaurant-data");
    var index = store.index("nameIndex");

    // Add some data
    // DBHelper.fetchRestaurants((error, restaurants) => {
    //   if (error) {
    //     callback(error, null);
    //   } else {
    //     restaurants.forEach( r => {
    //     if (r) { // Got the restaurant
    //       return(null, store.put({id: r.id}));
    //     } else { // Restaurant does not exist in the database
    //       callback('Restaurant does not exist', null);
    //     }}

    //         )
    //   }
    // });
    // fetch(`http://localhost:1337/restaurants`).then(res => res.json()).then(res => {
    //     store.put({id: res[4].id})
    // })
    store.put({id: 12345, name: "John Doe", age: 42});
    store.put({id: 67890, name: "Bob Smith", age: 35});
    store.put({id: 14011, name: "Tykki Mikk", age: 35});
    
    // Query the data
    var getJohn = store.get(12345);
    var getBob = index.get("Bob Smith");
    let getTykki = index.get('Tykki Mikk')

    getJohn.onsuccess = function() {
        console.log(getJohn.result.name);  // => "John"
    };

    getTykki.onsuccess = function() {
        console.log(getTykki.result.name);  // => "Tykki"
    };

    getBob.onsuccess = function() {
        console.log(getBob.result.name);   // => "Bob"
    };

    // Close the db when the transaction is done
    tx.oncomplete = function() {
        db.close();
    };
}