import './accordionSearchBar.scss';
import htmlToElement from 'html-to-element';

class searchBar {

    constructor($accordionHead, defaultSearchTerm) {
        this.defaultSearchTerm = defaultSearchTerm;
        this.timeout;   
        this.$searchBarWrapper = this.getElement();        
        this.$searchBar = this.$searchBarWrapper.querySelector('#searchBar--searchTerm');
        $accordionHead.appendChild(this.$searchBarWrapper);
        
        this.$searchBar.addEventListener('keyup', this.onKeyUp);
        this.$searchBar.addEventListener('keydown', () => {
            window.clearTimeout(this.timeout);
        });
        console.log(this.$searchBar);
    }

    onChange = () => {}

    onKeyUp = () => {
        this.timeout = setTimeout(() => {
            let searchTerm = this.$searchBar.value;

            if (this.$searchBar.value !== '')
                searchTerm = this.$searchBar.value;
            else
                searchTerm = this.defaultSearchTerm;
            
            this.onChange(searchTerm);
        }, 400);
    }

    getElement = () => {
        return htmlToElement(`
        <div id="searchBar" class="Suche Suche--accordion">
            <input id="searchBar--searchTerm" type="text" placeholder="Suche" value="">
            <label><i class="fa fa-search"></i></label>
        </div>
        `)
    };
}

export default searchBar;