import htmlToElement from 'html-to-element';
import searchBar from '../accordionSearchBar/accordionSearchBar';
import listItem from '../listItemContainer/listItem/listItem';
import fetchSiteList from '../../utils/fetchData';

export default class siteList {
    constructor(parentDiv) {
        let $parentDiv = document.querySelector(`.${parentDiv}`);
        
        this.searchTerm;
        this.displayedSites = 0;
        this.sitesPerFetch = 30;
        this.createAccordion($parentDiv);
        this.$siteList = document.querySelector('#siteList');
        this.sb = new searchBar(document.querySelector('.accordion__head--search'), 'chayns');
        this.createList();
        this.createShowMoreBtn();

        this.$showMoreBtn.addEventListener('click', this.showMore);

        this.sb.onChange = (value) => {
            console.log(value);
            
                
            this.displayedSites = 0;
            
            this.createList(value);
        }
        
    }

    createAccordion = ($parentDiv) => {
        const $accordion = htmlToElement(`
        <div class="accordion accordion--open" data-group="mfs">
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
        
        this.searchTerm = searchTerm;
        const jsonUrl = `https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchTerm}`;
        const filter = `&Skip=${this.displayedSites}&Take=${this.sitesPerFetch + 1}`;

        console.log(searchTerm);

        fetchSiteList(jsonUrl, filter)
        .then((fetchedData) => {
            if(this.displayedSites === 0) {
                this.$siteList.innerHTML = '';
            }
            
            let length = fetchedData.length;
            let allowShowMore = false;

            if (length > this.sitesPerFetch) {
                allowShowMore = true;
            }

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
            this.$siteList.appendChild(this.$showMoreDiv);
            if (allowShowMore === true) {
                this.$showMoreDiv.style.display = 'block';
            }
            else {
                this.$showMoreDiv.style.display = 'none';
            }
        }).catch(() => {
            this.$siteList.innerHTML = '<p>Keine Ergebnisse</p>';
        });

    }

createShowMoreBtn = () => {
    this.$showMoreDiv = htmlToElement(`
            <div id="showMore__wrapper" style="text-align: right">
                <a href="#" id="showMoreBtn">Mehr anzeigen</a>
            </div>
            `);
    this.$showMoreBtn = this.$showMoreDiv.querySelector('#showMoreBtn');
    this.$showMoreDiv.style.display = 'none';
}

    showMore = () => {
        this.createList(this.searchTerm);
    }
}