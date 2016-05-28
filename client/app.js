var express = require('express');
var app = express();
var path = require('path');

app.use('/build', express.static(__dirname + '/build'));
app.use('/src', express.static(__dirname + '/src'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});