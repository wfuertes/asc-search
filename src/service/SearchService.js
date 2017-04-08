let GooglePlayService = require('./GooglePlayService');

class SearchService {
    
    google(appname) {
        let googlePlayService = new GooglePlayService();
        return googlePlayService.findApp(appname);
    }

    apple(appname) {
        console.log('apple search');
        return 'apple search: ' + appname;
    }
}

module.exports = SearchService;