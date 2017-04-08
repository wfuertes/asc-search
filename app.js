var express = require('express');
var app = express();
var SearchService = require('./src/service/SearchService');

app.get('/api/:store/:appname', function (req, res) {
    let service = new SearchService();

    if (req.params.store === 'google') {
        service.google(req.params.appname)
            .then(app => res.json(app))
            .catch(error => res.status(error.status).json(error));
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
