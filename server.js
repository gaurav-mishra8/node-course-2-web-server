const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//   //res.send('<h1>hello express</h1>');
//   res.send({
//     name: 'Ashwell',
//     age: 28,
//     likes: ['cricket', 'tennis', 'table tennis']
//   });
// });

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    console.log(err);
  });

  console.log(log);
  next();
});

hbs.registerHelper('getCurrentYear', () => {
  //return 'test';
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('welcome.hbs', {
    pageTitle: 'Welcome Page',
    pageContent: 'This webpage is a demo node server',
  })
})

app.get('/about', (req, res) => {
  //res.send('This is about page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
})

app.get('/bad', (req, res) => {

  res.send({
    error: 'Bad request'
  })

});

app.listen(port, () => {
  console.log('Server is app on', port);
});
