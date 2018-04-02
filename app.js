const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set static path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/users', (req, res) => {
  let users = [
    {
      first_name: "John",
      last_name: "Doe",
      age: 34,
      gender: "male"
    },
    {
      first_name: "Tom",
      last_name: "Jackson",
      age: 23,
      gender: "male"
    },
    {
      first_name: "Tracy",
      last_name: "Smith",
      age: 38,
      gender: "female"
    }
  ];

  res.json(users);
});

app.get('/download', (req, res) => {
    res.download(path.join(__dirname, 'downloads/sibuyas.png'));
});

app.get('/about', (req, res) => {
    res.redirect('/about.html');
});

app.post('/subscribe', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;

    console.log(name+' has subscribed with '+email);
});

app.listen(3000, function () {
  console.log('Server started on port 3000...')
});


/*
// tuts video no6
app.get('/', function(req, res){
  res.send('Hello World');
});

app.get('/about', (req, res)=> {
  res.send('<h1>About</h1>');
});

//app.get('/users/brad', (req, res)=> {
app.get('/users/:name', (req, res)=> {
let user = req.params.name;
res.send('<h1>'+user+'</h1>');
});

*/


//NODE
// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });