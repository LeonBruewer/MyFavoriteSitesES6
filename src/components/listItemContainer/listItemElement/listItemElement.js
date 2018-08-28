import htmlToElement from 'html-to-element';
import './listItem.scss';

let getListItem = (data) => {
    let {title, description, bgImageUrl, targetUrl} = data;

    const $listItem = htmlToElement(`
    <div class="ListItem ListItem--clickable">
        <a href="${targetUrl}" target="_blank">
            <div class="ListItem__head">
                <div class="ListItem__Image" style="background: url(https://sub60.tobit.com/l/77891-07846) 0% 0% / 40px;">
                    <div class="ListItem__Image" style="background: url(${bgImageUrl}) 0% 0% / 40px;"></div>
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

export default getListItem;