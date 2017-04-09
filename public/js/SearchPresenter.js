document.querySelector('form').onsubmit = function (event) {
    event.preventDefault();
};

let loader = {
    open: () => {
        document.getElementById('loader').innerHTML = '<div class="loader"></div>';
    },
    close: () => {
        document.getElementById('loader').innerHTML = '';
    },
    isOpen: () => {
        return document.getElementById('loader').innerHTML && true;
    }
};

function rankingTable(app) {
    return `
        <table>
            <tr>
                <th>Icon</th>
                <th>App</th>
                <th>Overall</th>
                <th>Category</th>
            </tr>
            <tr>
                <td>
                    <img src="${app.icon}" />
                </td>
                <td>${app.name}</td>
                <td>${app.ranking.overall}</td>
                <td>${app.ranking.category.name}:${app.ranking.category.value}</td>
            </tr>
        </table>
    `;
};

function findApp(event) {
    let store = document.getElementById('store').value || 'NA';
    let appname = document.getElementById('appname').value || 'NA';

    loader.open();

    fetch(`/api/${store}/${appname}`).then(response => {
        response.json().then(ranking => {
            if (ranking.status == 'FOUND') {
                document.getElementById('ranking').innerHTML = rankingTable(ranking);
            } else {
                document.getElementById('ranking').innerHTML = '<p class="not-found">App not found</p>';
            }

            loader.close();
        }).catch(err=> {

            loader.close();
            document.getElementById('ranking').innerHTML = `<p class="not-found">App not found: ${err}</p>`;
        });
    });
}