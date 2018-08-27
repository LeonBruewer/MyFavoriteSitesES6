/* eslint-disable no-console */
import modeSwitchInit from './components/modeswitch/modeSwitch';
import personFinderInit from './components/personFinder/personFinder';
import SERVER_URL from './constants/server-url';
import siteList from './components/siteList/siteList';
import addSiteForm from './components/addSite/addSite';

const init = async () => {
    await chayns.ready;

    console.info('ServerUrl for current environment:', SERVER_URL);

    // initialise a Modeswitch
    modeSwitchInit();

    // start Personfinder
    personFinderInit();

    new siteList('tapp__content');
    new addSiteForm('tapp__content');
    document.querySelector('#aAdd').addEventListener('click', () => {
        document.querySelector('#addSite').className = 'accordion accordion--open';
        document.querySelector('#sitesAccordion').className = 'accordion';
    });;
};

init();
