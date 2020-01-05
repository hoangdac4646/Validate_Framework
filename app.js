var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, './public')));

app.set('views', "./views");
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('home')
});

app.use((req, res, next) => {
    return res.render('404');
});

app.listen(3000, function () {
    console.log('App is running on port 3000');
});
