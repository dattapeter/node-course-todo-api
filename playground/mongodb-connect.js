// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('unable to connect to MongoDB Server');
    }
    console.log('Connected to MOngoDB Server');

//     const db = client.db('TodoApp')

//     // db.collection('Todos').insertOne({
//     //     text: 'Something to do',
//     //     completed: false

//     // }, (err, result) => {
//     //     if(err) {
//     //         return console.log('unable to insert Todo', err);
//     //     }
//     //         console.log(JSON.stringify(result.ops, undefined, 2));
//     // });

//     db.collection('Users').insertOne({
//         name: 'Dattatray',
//         age: 34,
//         location: 'Miraroad'
//     }, (err, result) => {
//         if(err) {
//             return console.log('Unable to insert Users', err);
//         }        
//         console.log(JSON.stringify(result.ops, undefined, 2));
//     });

    client.close();
});
