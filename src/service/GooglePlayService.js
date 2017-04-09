let request = require('request');
let cheerio = require('cheerio');
var uuidV4 = require('uuid/v4');

const NormalizeHelper = require('../helpers/NormalizeHelper');

class GooglePlayService {

    findApp(appname) {
        return new Promise((resolve, reject) => {
            // TODO: alterar pesquisa para free apps para ficar igual a da apple store 
            // https://play.google.com/store/apps/collection/topselling_free?hl=en_US
            // https://play.google.com/store/apps/collection/topgrossing?hl=en_US
            // https://play.google.com/store/apps/category/GAME/collection/topselling_free
            request('https://play.google.com/store/apps/collection/topselling_free?hl=en_US', (error, response, body) => {
                if (error) {
                    console.log(`Error: ${error}`);
                    reject({
                        message: error.message,
                        status: 500
                    });
                    return;
                }

                let $ = cheerio.load(body);

                let appRanking = [];
                $('.card-content.id-track-click.id-track-impression').each((i, elem) => {
                    let uuid = uuidV4();
                    let name = $(elem).find('div.details a.title').attr('title');
                    let url = 'https://play.google.com' + $(elem).find('div.details a.card-click-target').attr('href');
                    let icon = 'https:' + $(elem).find('div.cover div.cover-inner-align img').attr('src');
                    let ranking = {
                        overall: $(elem).find('div.details a.title').text().match(/\d+/)[0],
                        category: {
                            name: '',
                            value: -1
                        }
                    };

                    appRanking.push({
                        uuid: uuid,
                        name: name,
                        url: url,
                        icon: icon,
                        ranking: ranking
                    });
                });

                // fetch description and category name
                let details = Promise.all(appRanking.map(app => {
                    return new Promise(resolve => {
                        request(app.url, (error, response, body) => {

                            if (error) {
                                resolve(app);
                            }

                            let $app = cheerio.load(body);
                            let categoryUrl = 'https://play.google.com' + $app('a.document-subtitle.category').attr('href');
                            let parts = categoryUrl.split('/');
                            let category = parts[parts.length - 1];
                            let description = $app('div.show-more-content.text-body').text();
                            if (description.length > 512) {
                                description = description.substring(0, 512) + " ...";
                            }

                            app.description = description;
                            app.ranking.category.name = category;
                            app.ranking.category.url = categoryUrl;

                            // filled app
                            resolve(app);
                        });
                    }).catch(err => {
                        resolve(app);
                    });
                }));

                details.then(apps => {
                    console.log('aqui');

                    // category map and score at top 60
                    let categoryMap = new Map();
                    apps.forEach(app => {
                        let categoryName = app.ranking.category.name;
                        if (!categoryMap.has(categoryName)) {
                            categoryMap.set(categoryName, []);
                        }
                        categoryMap.get(categoryName).push(app);
                    });

                    for (let [key, value] of categoryMap) {
                        value.sort((a, b) => {
                            return a.ranking.overall > b.ranking.overall ? +1 : -1;
                        });

                        value.forEach((app, index) => {
                            app.ranking.category.value = index + 1;
                        });
                    }

                    // making the search
                    let app = apps.find(app => {
                        let siteName = NormalizeHelper.normalize(app.name);
                        let searchedName = NormalizeHelper.normalize(appname);

                        // console.log(`${siteName}=${searchedName}`);
                        return siteName.indexOf(searchedName) === 0;
                    });

                    if (app) {
                        app.status = 'FOUND';
                    }
                    
                    resolve(app ? app : { status: 'NOT_FOUND' });
                });

            });
        });
    }
}

module.exports = GooglePlayService;