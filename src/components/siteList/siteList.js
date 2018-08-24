import htmlToElement from 'html-to-element';

export default class siteList {
    constructor(parentDiv) {
        let $parentDiv = document.querySelector(`.${parentDiv}`);
        
        this.createAccordion($parentDiv);
    }

    createAccordion = ($parentDiv) => {
        const $accordion = htmlToElement(`
        <div class="accordion">
        <div class="accordion__head">Sites</div>
        <div class="accordion__body">
          <div class="accordion__content">
            <div id="siteList">
          </div>
        </div>
      </div>`);

        $parentDiv.appendChild($accordion);
    }
}