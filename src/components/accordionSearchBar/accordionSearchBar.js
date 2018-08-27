import './accordionSearchBar.scss';
import htmlToElement from 'html-to-element';

export default class searchBar {
    constructor($accordionHead) {
        const searchBar = htmlToElement(`
        
        <div id="searchBar" class="Suche Suche--accordion">
            <input id="searchTerm" type="text" placeholder="Suche" value="">
            <label><i class="fa fa-search"></i></label>
        </div>
        `);
    
        $accordionHead.appendChild(searchBar);
    }
}