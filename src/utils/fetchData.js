export default function fetchSiteList(url, filter) {
    let $siteList = document.querySelector('#siteList');
    return new Promise((resolve, reject) => {
        chayns.showWaitCursor();
        let fullUrl = url + filter;
            fetch(fullUrl)
            .then( (response) => {
                return response.json();
            }).then( (json) => {
                resolve(json.Data);

                chayns.hideWaitCursor();
            }).catch( (ex) => {
                console.log('parsing failed', ex);
                $siteList.innerHTML = '<p>Keine Ergebnisse gefunden.</p>';
                chayns.hideWaitCursor();
                document.querySelector('#showMoreBtn').style.display = 'none';
            })
    });
}
