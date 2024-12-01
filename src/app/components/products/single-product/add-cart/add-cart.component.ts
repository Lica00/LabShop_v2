import { Component, inject, Input } from '@angular/core';
import { prodotto } from '../../../../models/customType';
import { LocalStorageService } from '../../../../services/local-storage.service';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrl: './add-cart.component.scss'
})
export class AddCartComponent {

  localS : LocalStorageService = inject(LocalStorageService);

  @Input()
  prodotto! : prodotto;

  // Applica classe per transition successiva a inserimento nel DOM
  animation : boolean = false; 

  ngOnInit(){
    this.localS.addProduct(this.prodotto);
    setTimeout( () => { this.animation = true; }, 1 );

    // animazione rientro dopo 5s ( dopo 6s il genitore rimuove il comp. )
    setTimeout( () => { this.animation = false; }, 5000 ); 
  }

}
