function getFullUrl(url, filter) {
    return new Promise(function(resolve, reject) {
        try {
            let timeout = setTimeout(function() {
            //var searchTerm = $searchTerm.value;
            var jsonUrl = [url, filter];
            
            //if ($searchTerm.value === '')
                //searchTerm = 'chayns';
    
            var fullUrl = jsonUrl[0] + jsonUrl[1];

            resolve(fullUrl);
        }, 200);
        }
        catch(ex) {
            reject();
        }
    });
}

export default function fetchSiteList(url, filter) {
    let $siteList = document.querySelector('#siteList');
    return new Promise((resolve, reject) => {
        chayns.showWaitCursor()
        getFullUrl(url, filter)
        .then( (dataUrl) => {
            fetch(dataUrl)
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
    });
}
