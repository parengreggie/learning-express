const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Port
const port = 3000;

// Init app
const app = express();

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017';
const dbname = 'todoapp';

// Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


// View Setup using EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Connect to mongodb
MongoClient.connect(url, (err, client) => {  
  if(err) throw err;
  
  console.log('MongoDB Connected...');   
  db = client.db(dbname);
  masterDB = client;
  // Todos = database.collection('todos');
  collection = db.collection('todos');
//  client.close();
  app.listen(port, () => {
    console.log('Server running in port: '+ port);
  });
});

app.get('/', (req, res, next) => {
  collection.find({}).toArray((err, todos)=>{
    if(err){
      return console.log(err);
    }    
    //console.log(todos);
    //masterDB.close();
    res.render('index', {
      todos: todos    
    });
  });
});

app.post('/todo/add', (req, res, next) => {
  const todo = {
    text: req.body.text,
    body: req.body.body
  }

  collection.insert(todo, (err, result) => {
    if(err) {
      return console.log(err);
    }
    console.log('Todo Added...');
    res.redirect('/');
  });
});

app.delete('/todo/delete/:id', (req, res, next) => {
  const query = {_id: ObjectID(req.params.id)}

  collection.deleteOne(query, (err, response) => {
    if(err) {
      return console.log(err);
    }
    console.log('Todo Removed');
    // res.send(200); // depecrated
    res.sendStatus(200);
  });
});

app.get('/todo/edit/:id', (req, res, next) => {
  const query = {_id: ObjectID(req.params.id)}

  collection.find(query).next((err, todo)=>{
    if(err){
      return console.log(err);
    }    
    //console.log(todos);
    //masterDB.close();
    res.render('edit', {
      todo: todo
    });
  });
});

app.post('/todo/edit/:id', (req, res, next) => {
  const query = {_id: ObjectID(req.params.id)}

  const todo = {
    text: req.body.text,
    body: req.body.body
  }

  collection.updateOne(query, {$set:todo}, (err, result) => {
    if(err) {
      return console.log(err);
    }
    console.log('Todo Updated...');
    res.redirect('/');
  });
});