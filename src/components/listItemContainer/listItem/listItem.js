import getListItem from '../listItemElement/listItemElement';

export default class listItem {
    constructor(data, $parent) {
        
        //console.log(data);
        let item = getListItem(data);
        $parent.appendChild(item);
    }
}