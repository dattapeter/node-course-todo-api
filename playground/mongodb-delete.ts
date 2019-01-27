// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('unable to connect to MongoDB Server');
    }
    console.log('Connected to MOngoDB Server');

    const db = client.db('TodoApp')

    db.collection('Todos').deleteOne({ text: 'Lunch'}).then((result) => {
        console.log(result);
    });

    // client.close();
});
