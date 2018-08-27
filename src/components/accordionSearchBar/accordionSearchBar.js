import './accordionSearchBar.scss';
import htmlToElement from 'html-to-element';

class searchBar {

    constructor($accordionHead, defaultSearchTerm) {
        this.defaultSearchTerm = defaultSearchTerm;
        this.timeout;   

        this.$searchBarWrapper = this.getElement();        
        
        this.$searchBar = this.$searchBarWrapper.querySelector('#searchBar--searchTerm');
        this.$searchBar.addEventListener('keyup', () => {
            this.timeout = setTimeout(() => {
                let searchTerm = this.$searchBar.value;

                if (this.$searchBar.value !== '')
                    searchTerm = this.$searchBar.value;
                else
                    searchTerm = this.defaultSearchTerm;
                
                this.onChange(searchTerm);
            }, 400);

            
        });

        $accordionHead.appendChild(this.$searchBarWrapper);

        this.$searchBar.addEventListener('keydown', () => {
            window.clearTimeout(this.timeout);
            console.log('timeout cleared');
        });
        console.log(this.$searchBar);
    }

    onChange = () => {
        
    }

    getElement = () => {
        return htmlToElement(`
        <div id="searchBar" class="Suche Suche--accordion">
            <input id="searchBar--searchTerm" type="text" placeholder="Suche" value="">
            <label><i class="fa fa-search"></i></label>
        </div>
        `)
    };

    onUpdateSearchTerm = () => {
        return new Promise((resolve, reject) => {
            try {
                
                let searchTerm = this.defaultSearchTerm;

                    this.timeout = setTimeout(() => {
                        if (this.$searchBar.value !== '')
                            searchTerm = this.$searchBar.value;
                        else
                            searchTerm = this.defaultSearchTerm;
                        
                        resolve(searchTerm);
                    }, 400);
            }
            catch(ex) {
                console.log(`error: ${ex}`);
                reject();
            }
        });
    }

    //getSearchterm = () => document.querySelector('#searchBar--searchTerm').value;
}

export default searchBar;