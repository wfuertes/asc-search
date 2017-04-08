class SearchService {
    
    google(appname) {
        console.log('google search');
        return 'google search: ' + appname;
    }

    apple(appname) {
        console.log('apple search');
        return 'apple search: ' + appname;
    }
}

module.exports = SearchService;