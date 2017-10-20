const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + "\n", (err) =>{
    if (err) console.log("Unable to append to server.log");
  });
  next();
});
/*app.use((req, res, next) => {
  res.render('maintenance.hbs');
});*/
hbs.registerHelper('getCurrentYear', () => "Copyright " + new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase())
app.get("/", (req,res)=>{
  //res.send("<h1>Hello Express</h1>");
  res.render('home.hbs', {
    pageTitle: "Home page",
    welcomeMsg: "Welcome to my page"
  });
});
app.get("/about", (req,res) => {
  res.render('about.hbs', {
    pageTitle: "About page"
  });
});
app.get("/projects", (req,res) =>{
  res.render('projects.hbs', {
    pageTitle: "Projects"
  });
});
app.get("/bad", (req,res) => {
  res.send({
    errorMessage: "Something went wrong"
  });
});
app.listen(port, () => {
  console.log("Server is up on port ",port);
});
