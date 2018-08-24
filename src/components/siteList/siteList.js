import htmlToElement from 'html-to-element';
import searchBar from '../accordionSearchBar/accordionSearchBar';

export default class siteList {
    constructor(parentDiv) {
        let $parentDiv = document.querySelector(`.${parentDiv}`);
        this.createAccordion($parentDiv);
        new searchBar(document.querySelector('.accordion__head--search'));
    }

    createAccordion = ($parentDiv) => {
        const $accordion = htmlToElement(`
        <div class="accordion">
        <div class="accordion__head accordion__head--search">
        Sites
        </div>
        <div class="accordion__body">
          <div class="accordion__content">
            <div id="siteList">
          </div>
        </div>
      </div>`);

        $parentDiv.appendChild($accordion);
    }
}