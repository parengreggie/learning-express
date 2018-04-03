const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Port
const port = 3000;

// Init app
const app = express();

const MongoClient = require('mongodb').MongoClient;
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

//  client.close();
  app.listen(port, () => {
    console.log('Server running in port: '+ port);
  });
});

app.get('/', (req, res, next) => {
  const collection = db.collection('todos');

  collection.find({}).toArray((err, todos)=>{
    if(err){
      return console.log(err);
    }    
    console.log(todos);
    masterDB.close();
    res.render('index', {
      todos: todos    
    });
  });
});