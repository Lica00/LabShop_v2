import { Component, inject } from '@angular/core';
import { prodotto } from '../../../models/customType';
import { LocalStorageService } from '../../../services/local-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recap-prod',
  templateUrl: './recap-prod.component.html',
  styleUrl: './recap-prod.component.scss'
})
export class RecapProdComponent {

  localS : LocalStorageService = inject(LocalStorageService);
  rotta : ActivatedRoute = inject(ActivatedRoute);

  pathCart! : boolean;
  prodottiCart : prodotto[] = [];


  remove( id : string){ 
    this.localS.removeProduct(id);  // Rimuovo prodotto
    this.getProd();                 // Richiede prodotti cart ( aggiornamento )
    this.localS.obserUpdate.next(); // Emissione subject ( aggiorna prezzo cart )
  }

  // Richiami se rimosso un prodotto ( aggiorna prodotti visibili )
  getProd(){ this.prodottiCart = this.localS.getAllProducts(); }

  ngOnInit(){
    this.getProd(); 
    
    let path = this.rotta.snapshot.routeConfig?.path;  

    // Se "cart" o "payment" cambia i bottoni ( btn rimuovi prod )
    ( path == "cart" ) ? this.pathCart = true : this.pathCart = false; 
  }


}
