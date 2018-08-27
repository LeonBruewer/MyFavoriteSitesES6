import './accordionSearchBar.scss';
import htmlToElement from 'html-to-element';

class searchBar {

    constructor($accordionHead) {
        
        const $searchBar = htmlToElement(`
        
        <div id="searchBar" class="Suche Suche--accordion">
            <input id="searchBar--searchTerm" type="text" placeholder="Suche" value="">
            <label><i class="fa fa-search"></i></label>
        </div>
        `);
        this.$searchBar = $searchBar;
        $accordionHead.appendChild($searchBar);
    }

    getSearchterm = () => document.querySelector('#searchBar--searchTerm').value;
}

export default searchBar;