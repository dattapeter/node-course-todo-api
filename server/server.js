const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {user} = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    }); 

    todo.save().then((doc) => {
        res.send(doc);
    }, (error) => {
        res.status(400).send(error);
    });

});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    })
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then(todo => {
        res.status(200).send({todo})
    }, error => {
        res.status(400).send(error);
    });
})

app.listen(3000, () => {
    console.log('Server started on port : 3000');
})

module.exports = {app};