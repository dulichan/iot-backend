'use strict';
/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 3000;
var r = require('rethinkdb');
/*
 * Use Handlebars for templating
 */
var exphbs = require('express3-handlebars');
var hbs;
// For gzip compression
app.use(express.compress());
app.use(express.json());
/*
 * Config for Production and Development
 */
if (process.env.NODE_ENV === 'production') {
    // Set the default layout and locate layouts and partials
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: 'dist/views/layouts/',
        partialsDir: 'dist/views/partials/'
    }));
    // Locate the views
    app.set('views', __dirname + '/dist/views');
    // Locate the assets
    app.use(express.static(__dirname + '/dist/assets'));
} else {
    app.engine('handlebars', exphbs({
        // Default Layout and locate layouts and partials
        defaultLayout: 'main',
        layoutsDir: 'views/layouts/',
        partialsDir: 'views/partials/'
    }));
    // Locate the views
    app.set('views', __dirname + '/views');
    // Locate the assets
    app.use(express.static(__dirname + '/assets'));
}
// Set Handlebars
app.set('view engine', 'handlebars');
/*
 * Routes
 */
// Index Page
app.get('/', function(request, response, next) {
    response.render('index');
});
app.get('/blame/product', function(request, response, next) {
    // console.log(request.body);
    console.log("sdfsdf");
    response.end();
    // console.log(JSON.parse(request.body));
});
app.post('/blame', function(request, response, next) {
    console.log(request.body);
    response.end();
    // console.log(JSON.parse(request.body));
});
app.post('/temperature', function(request, response, next) {
    console.log(request.body);
    response.end();
});
app.post('/register', function(request, response, next) {
    console.log(request.body);
    var obj = {
        "status": "200",
        "payload": {
            "tokens": {
                "access_token": "dfsdfsd",
                "refresh_token": "dsfsdjflk"
            },
            "topics": {
                "device": "dfjslkdfj"
            }
        }
    };
    response.write(JSON.stringify(obj));
    response.end();
});
app.post('/iot', function(request, response, next) {
    r.connect({
        host: 'localhost',
        port: 28015
    }, function(err, conn) {
        r.table("information").insert(request.body).run(conn, function(err, res) {
                if (err) throw err;
            });
        
    });
    response.end();
    //console.log(JSON.parse(request.body));
});
/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);