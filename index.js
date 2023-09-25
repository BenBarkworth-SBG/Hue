const express = require('express');
const app = express();
const port = 3006;
app.listen(port, () => {
  console.log(__dirname);
})
app.get('/home', (req, res) => {    
  res.sendFile(__dirname + "/html/home.html");
  
})
app.get('/aboutus', (req, res) => {    
  res.sendFile(__dirname + "/html/aboutus.html");
})
app.get('/myprofile', (req, res) => {    
  res.sendFile(__dirname + "/html/myprofile.html");
})
app.get('/login', (req, res) => {    
  res.sendFile(__dirname + "/html/login.html");
})

