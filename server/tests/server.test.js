const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: "First To do"
}, {
    _id: new ObjectID(),
    text: "Second To do"
}];



beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);    
    }).then (() => done());
})

describe('POST /todos', () => {

    it('should create new Todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((response) => {
                expect(response.body.text).toBe(text);
            })
            .end((err, response) => {
                if(err) {
                   return done(err)
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e)); 
            })
    });

    it('should not create todo with invalid data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch(e => done(e));
            });
    });
});

describe('GET /todos route', () => {
    it(' should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect(res => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })
});

describe('GET /todos/id', () => {

    it('should return a todo doc', done => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect(res => {
                console.log(res.body);
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    })

    it('should return a 404 if todo does not found', done => {
        request(app)
            .get(`/todos/12344555`)
            .expect(404)
            .end(done);
    });
});







