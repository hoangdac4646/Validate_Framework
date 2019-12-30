var express = require('express');
var app = express();
var path = require('path');
var ejs = require('ejs');
var bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.use((req, res, next) => {
    return res.render('404');
});


app.listen(3000, function () {
    console.log('App is running on port 3000');
});
