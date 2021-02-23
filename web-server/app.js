const express = require('express')
const hbs = require('hbs');
const app = express()
//handlebars
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');



app.use(express.static('public'))

app.get('/', function (req, res) {
    res.render('home', {
        nombre: 'Ramses',
        titulo: 'curso de Node'
    })
})

app.get('/generic', function (req, res) {
    res.sendFile(__dirname + '/public/generic.html')
})

app.listen(8080)