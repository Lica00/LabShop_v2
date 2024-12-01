import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.component.html',
  styleUrl: './nav-mobile.component.scss'
})
export class NavMobileComponent {

  @Output()
  closeEvent : EventEmitter<void> = new EventEmitter<void>;

  // Rimozione componente dal DOM ( da parte del genitore )
  emettiEvento(){ this.closeEvent.emit();  }

  // Blocca propagaz. evento ( click su <section> non si propaga a click <div> di sfondo )
  stopProp( event : Event ){ event.stopPropagation(); }

}
