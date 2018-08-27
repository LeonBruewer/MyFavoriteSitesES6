import htmlToElement from 'html-to-element';
import searchBar from '../accordionSearchBar/accordionSearchBar';
import listItem from '../listItemContainer/listItem/listItem';
import fetchSiteList from '../../utils/fetchData';

export default class siteList {
    constructor(parentDiv) {
        let $parentDiv = document.querySelector(`.${parentDiv}`);
        
        this.displayedSites = 0;
        this.sitesPerFetch = 30;
        this.createAccordion($parentDiv);
        this.$siteList = document.querySelector('#siteList');
        this.sb = new searchBar(document.querySelector('.accordion__head--search'), 'chayns');
        this.createList();

        /* this.sb.$searchBar.addEventListener('keyup', () => {
            this.sb.onUpdateSearchTerm()
            .then((searTerm) => {
                this.$siteList.innerHTML = '';
                this.displayedSites = 0;
                this.createList();
                console.log(searTerm);
            });
        }); */

        this.sb.onChange = (value) => {
            console.log(value);
            
            this.displayedSites = 0;
            this.createList(value);
        }
        
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

    createList = (searchTerm) => {
        this.data;
        if (searchTerm === undefined)
            searchTerm = 'chayns';
            
        const jsonUrl = `https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchTerm}`;

        fetchSiteList(jsonUrl, `&Skip=${this.displayedSites}&Take=${this.sitesPerFetch}`)
        .then((fetchedData) => {
            this.$siteList.innerHTML = '';
            for (var i = 0; i < fetchedData.length; i++) {
                let siteId = fetchedData[i].siteId;
                let data = {
                    title: fetchedData[i].appstoreName,
                    description: siteId,
                    bgImageUrl: `https://sub60.tobit.com/l/${siteId}`,
                    targetUrl: `https://chayns.net/${siteId}`
                };

                new listItem(data, this.$siteList);
                this.displayedSites++;
            }
        });
    }
}