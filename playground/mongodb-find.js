// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('unable to connect to MongoDB Server');
    }
    console.log('Connected to MOngoDB Server');

    const db = client.db('TodoApp')

    db.collection('Todos').find({
        _id: new ObjectID('5c4d85b393061e08980f6bf8')
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to getch');
    });

    // client.close();
});
