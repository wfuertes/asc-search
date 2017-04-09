var request = require('request');
var cheerio = require('cheerio');
var uuidV4 = require('uuid/v4');

const NormalizeHelper = require('../helpers/NormalizeHelper');

class AppleStoreService {

    findApp(appname) {
        let result = new Promise(resolve => {
            request('http://www.apple.com/br/itunes/charts/free-apps', (error, response, body) => {
                resolve(body);
            });
        });

        return result.then(body => {
            let $ = cheerio.load(body);
            let rankingHtml = $('#main > section.section.apps.chart-grid').html();

            let ranking = [];

            $('#main > section.section.apps.chart-grid div.section-content > ul > li').each((i, elem) => {
                ranking.push({
                    uuid: uuidV4(),
                    name: $(elem).find('h3 > a').text(),
                    url: $(elem).find('a').attr('href'),
                    icon: 'http://www.apple.com' + $(elem).find('img').attr('src'),
                    ranking: {
                        overall: parseInt($(elem).find('strong').text().replace('.', '')),
                        category: {
                            name: $(elem).find('h4 > a').text(),
                            value: -1
                        }
                    }
                });
            });

            // category map and score at top 100
            let categoryMap = new Map();
            ranking.forEach(app => {
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

            // console.log(JSON.stringify(categoryMap.get('Redes sociais'), null, 2));

            // making the search
            let app = ranking.find(app => {
                let siteName = NormalizeHelper.normalize(app.name);
                let searchedName = NormalizeHelper.normalize(appname);

                // console.log(`${siteName}=${searchedName}`);
                return siteName.indexOf(searchedName) === 0;
            });

            // getting description
            if (app) {
                app.status = 'FOUND';
                app.ranking.category.value = categoryMap.get(app.ranking.category.name).find(a => a.uuid === app.uuid).ranking.category.value;

                let details = new Promise(resolve => {
                    request(app.url, (error, response, body) => {
                        let _page = cheerio.load(body);
                        let description = _page('#content > div > div.center-stack > div:nth-child(1) > p').text();

                        // app details
                        resolve({
                            description: description
                        });
                    });
                });

                return details.then(d => {
                    app.description = d.description.substring(0, 512) + ' ...';
                    return app;
                });
            } else {
                app = {
                    status: 'NOT_FOUND'
                };
            }

            console.log(app || 'not found');
            return app;
        });
    }
}

module.exports = AppleStoreService;