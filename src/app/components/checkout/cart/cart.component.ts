import { Component, inject } from '@angular/core';
import { RequestHttpService } from '../../../services/request-http.service';
import { prodotto } from '../../../models/customType';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  request : RequestHttpService = inject(RequestHttpService);
  arrProducts : prodotto[]= [];

  ngOnInit(){
      // Chiede dati 3 prodotti casuali 
      let nRandom : number = Math.floor(Math.random() * 41 );
    
      this.request.rangeProdotti( nRandom, nRandom + 3 ).subscribe(
        { next : (dati) => {  this.arrProducts = dati; } }
      )
  }


}
