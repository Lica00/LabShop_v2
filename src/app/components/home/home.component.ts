import { Component, inject } from '@angular/core';
import { RequestHttpService } from '../../services/request-http.service';
import { prodotto } from '../../models/customType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  // Chiede dati 6 prodotti casuali e li passa ai componenti figli
  // suddivisi in due sub-array ( 3 prodotti per ciascun figlio )

  request : RequestHttpService = inject(RequestHttpService);
  arrProducts : prodotto[][] = [];

  ngOnInit(){
    let nRandom : number = Math.floor(Math.random() * 41 );

    this.request.rangeProdotti( nRandom, nRandom + 6 ).subscribe(
      { 
        next : (dati) => {  this.arrProducts.push( dati.slice(0,3)); this.arrProducts.push( dati.slice(3,6)); }
      }
    )
  }

}
