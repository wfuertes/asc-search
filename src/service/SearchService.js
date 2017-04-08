var request = require('request');
var cheerio = require('cheerio');
var uuidV4 = require('uuid/v4');

const GooglePlayService = require('./GooglePlayService');
const AppleStoreService = require('./AppleStoreService');

class SearchService {

    google(appname) {
        let googlePlayService = new GooglePlayService();
        return googlePlayService.findApp(appname);
    }

    apple(appname) {
        console.log('[SEARCH] searching at apple store');
        let appleService = new AppleStoreService();
        return appleService.findApp(appname);
    }
}

module.exports = SearchService;