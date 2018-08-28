import htmlToElement from 'html-to-element';
import searchBar from '../accordionSearchBar/accordionSearchBar';
import listItem from '../listItemContainer/listItem/listItem';
import fetchSiteList from '../../utils/fetchData';

export default class siteList {
    constructor($parentDiv) {
        this.$accordion = this.createAccordion($parentDiv);
        this.searchTerm;
        this.displayedSites = 0;
        this.sitesPerFetch = 30;
        this.$siteList = this.$accordion.querySelector('#siteList');
        let $searchBarParent = this.$accordion.querySelector('.accordion__head--search');
        this.sb = new searchBar($searchBarParent, 'chayns');
        
        this.createList(this.sb.defaultSearchTerm);
        this.createShowMoreBtn();

        this.$showMoreBtn.addEventListener('click', this.showMore);

        this.sb.onChange = (value) => {
            this.displayedSites = 0;
            this.createList(value, 0);
        }
    }

    createAccordion = ($parentDiv) => {
        let $accordion = htmlToElement(`
        <div class="accordion accordion--open" data-group="mfs" id="sitesAccordion">
            <div class="accordion__head accordion__head--search">Sites</div>
            <div class="accordion__body">
                <div class="accordion__content">
                    <div id="siteList"></div>
                </div>
            </div>
        </div>
        `);

        $parentDiv.appendChild($accordion);

        return $accordion;
    }

    createList = (searchTerm, count) => {
        this.data;
        this.searchTerm = searchTerm;
        const jsonUrl = `https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchTerm}`;
        const filter = `&Skip=${this.displayedSites}&Take=${this.sitesPerFetch + 1}`;
        console.log(`filter: ${filter}`);
        fetchSiteList(jsonUrl, filter)
        .then((fetchedData) => {
            console.log(this.displayedSites);
            if(count === 0) {
                this.$siteList.innerHTML = '';
            }
            
            let length = fetchedData.length;
            let allowShowMore = false;

            if (length > this.sitesPerFetch) {
                allowShowMore = true;
            }

            for (let dataElement of fetchedData) {
                let siteId = dataElement.siteId;
                let data = {
                    title: dataElement.appstoreName,
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