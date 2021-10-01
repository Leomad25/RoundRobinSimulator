const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

// Initializations
const app = express();
const http = require('http').Server(app);

// Settings
app.set('port', 8080);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes
app.use(require('./routes/index'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting server
http.listen(app.get('port'), function() {
    console.log("Server runing");
    console.log("listening on *:" + app.get('port'));
});