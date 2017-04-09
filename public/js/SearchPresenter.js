document.querySelector('form').onsubmit = function (event) {
    event.preventDefault();
};

function rankingTable(app) {
    return `
        <table>
            <tr>
                <th></th>
                <th>App</th>
                <th>Overall</th>
                <th>${app.ranking.category.name}</th>
            </tr>
            <tr>
                <td>
                    <img src="${app.icon}" />
                </td>
                <td>${app.name}</td>
                <td>${app.ranking.overall}</td>
                <td>${app.ranking.category.value}</td>
            </tr>
        </table>
    `;
};

function findApp(event) {

    let store = document.getElementById('store').value || 'NA';
    let appname = document.getElementById('appname').value || 'NA';

    console.log(store, appname);

    fetch(`/api/${store}/${appname}`).then(response => {
        response.json().then(ranking => {
            if (ranking.status == 'FOUND') {
                document.getElementById('ranking').innerHTML = rankingTable(ranking);
            } else {
                document.getElementById('ranking').innerHTML = 'App not found';
            }
        });
    });
}