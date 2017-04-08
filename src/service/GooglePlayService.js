let request = require('request');
let cheerio = require('cheerio');

class GooglePlayService {

    findApp(appname) {
        return new Promise((resolve, reject) => {
            request('https://play.google.com/store/apps/collection/topgrossing?hl=en_US', (error, response, body) => {
                if(error) {
                    console.log(`Error: ${error}`);
                    reject({
                        message : error.message,
                        status : 500
                    });
                    return;
                }

                let $ = cheerio.load(body);
                let $linkTag = $(`a[title='${appname}']`);

                if(!$linkTag.html()) {
                    reject({
                        message : `There's no app named '${appname}' available in the app store`,
                        status : 404
                    });
                    return;
                }

                let $element = $linkTag.parents('.card-content.id-track-click.id-track-impression');
                
                let icon = `https:${$element.find('img').attr('src')}`;
                let position = $linkTag.text().match(/\d+/)[0];

                let app = {
                    name : appname,
                    icon : icon,
                    ranking : {
                        overall : position
                    }
                };

                resolve(app);
            });
        });
    }
}

module.exports = GooglePlayService;