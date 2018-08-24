import htmlToElement from 'html-to-element';
import 'listItem.scss';

export default getListItem = (data) => {
    let {title, description, bgImageUrl} = data;

    const $listItem = htmlToElement(`
    <div class="ListItem ListItem--clickable">
    <a href="https://chayns.net/64387-14541" target="_blank"><div class="ListItem__head">
    <div class="ListItem__Image" style="background: url(&quot;images/default_image_small.png&quot;) 0% 0% / 40px;">
    <div class="ListItem__Image" style="background: url(${bgImageUrl}) 0% 0% / 40px;">
    </div>
    </div>
    <div class="ListItem__Title">
    <p class="ListItem__Title--headline">${title}</p>
    <p class="ListItem__Title--description">${description}</p>
    </div>
    </div>
    </a>
    </div>
    `);

    return $listItem;
}