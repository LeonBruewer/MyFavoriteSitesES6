import htmlToElement from 'html-to-element';

export default class addSiteForm {
    constructor($parent) {
        let $parentDiv = document.querySelector(`.${$parent}`);
        let $accordion = this.getElement();
        let $sendButton = $accordion.querySelector('#send');
        
        $parentDiv.appendChild($accordion);
        $sendButton.addEventListener('click', this.addSite);
    }

    addSite = () => {
        var name = document.querySelector('#inpName').value;
        var street = document.querySelector('#inpStreet').value;
        var plz = document.querySelector('#inpPlz').value;
        var ort = document.querySelector('#inpOrt').value;
        var mail = document.querySelector('#inpMail').value;
        var comment = document.querySelector('#inpComment').value;

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            chayns.intercom.sendMessageToPage({ 
                text: 'Name: ' + name + '\n Straße: ' + street + '\n PLZ: ' + plz + '\n Ort: ' + ort + '\n E-Mail: ' + mail + '\n Kommentar: ' + comment
            }).then((data) => {            
                if(data.status == 200)
                chayns.dialog.alert('','Antrag wurde gestellt');
            });
        }
        else {
            chayns.dialog.alert('', 'Du musst eine gültige E-Mail Adresse angeben');
        }
    }

    getElement = () => {
        const element = htmlToElement(`
        <div class="accordion" data-group="mfs" id="addSite">
        <div class="accordion__head">Seite hinzufügen<p class="badge right"><i class="fa fa-plus "></i></p></div>
        <div class="accordion__body">
          <div class="accordion__content">
            <input type="text" class="input" id="inpName" placeholder="Name" style="width: 100%">
            <input type="text" class="input" id="inpStreet" placeholder="Straße" style="width: 100%">
            <div class="grid">
                <div class="grid__item col-1-2-desktop"><input type="text" class="input" id="inpPlz" placeholder="PLZ" style="width: 90%"></div>
                <div class="grid__item col-1-2-desktop"><input type="text" class="input" id="inpOrt" placeholder="Ort" style="width: 100%"></div>
            </div>
            <input type="text" class="input" id="inpMail" placeholder="E-Mail" style="width: 100%">
            <textarea type="text" class="input" id="inpComment" placeholder="Kommentar" style="width: 100%"></textarea>
            <div style="text-align: center; margin-top: 15px;">
                <button id="send" class="button">Senden</button>
            </div>
          </div>
        </div>
    </div>
        `);

        return element;
    }
}