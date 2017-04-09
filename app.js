var express = require('express');
var app = express();

const SearchService = require('./src/service/SearchService');


app.use(express.static('public'))

app.get('/api/:store/:appname', function (req, res) {
    let store = req.params.store;
    let appname = req.params.appname;
    let search = new SearchService();

    if (store === 'google') {
        search.google(req.params.appname)
            .then(app => res.json(app))
            .catch(error => res.status(error.status).json(error));

    } else if (store === 'apple') {
        search.apple(appname)
            .then(ranking => res.send(ranking))
            .catch(err => {
                res.status(500).send({
                    status: 'ERROR',
                    message: 'Unable to retreive results for store=' + store + ' and appname=' + appname,
                    error: err
                });
            });

    } else {
        res.send({
            status: 'NO_SEARCH_SERVICE',
            message: 'No search service for ' + req.params.store
        });
    }
});

app.listen(3000, function () {
    console.log('asc-search listening on port 3000!');
});