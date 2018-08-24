import '../listItemElement/listItemElement';

export default class listItem {
    constructor(data, $parent) {
        let item = getListItem(data);
        $parent.appendChild(item);
    }
}