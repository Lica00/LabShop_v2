import { Component, EventEmitter, inject, Output } from '@angular/core';
import { RequestHttpService } from '../../../services/request-http.service';
import { prodotto } from '../../../models/customType';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  request : RequestHttpService = inject(RequestHttpService);

  ricerca : string = "";
  prodotti! : prodotto[];

  @Output()
  closeEvent : EventEmitter<void> = new EventEmitter<void>;

  // Rimozione componente dal DOM ( da parte del genitore )
  emettiEvento(){ this.closeEvent.emit(); }

  // Blocca propagaz. evento ( click su <section> non si propaga a click <div> di sfondo )
  stopProp( event : Event ){ event.stopPropagation(); }

  cerca(){
    let search = this.ricerca;

    if( search.length > 2 ){
      this.request.getSearch(search).subscribe(
        { next : (dati) => { this.prodotti = dati; } }
      )
    }
  }

}
