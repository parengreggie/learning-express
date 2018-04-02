const express = require('express');

const app = express();

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

app.listen(3000, function(){
    console.log('Server started on port 3000...')
});





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