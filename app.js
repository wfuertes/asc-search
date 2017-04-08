var express = require('express');
var app = express();
var SearchService = require('./src/service/SearchService');

app.get('/api/:store/:appname', function (req, res) {
    let service = new SearchService();

    if (req.params.store === 'google') {
        let result = service.google(req.params.appname);
        res.send('Hello World! ' + result);
    } else if (req.params.store === 'apple') {
        let result = service.apple(req.params.appname);
        res.send('Hello World! ' + result);
    } else {
        res.send('Hello World!  ');
    }
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
