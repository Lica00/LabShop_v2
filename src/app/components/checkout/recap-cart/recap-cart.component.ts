import { Component, inject } from '@angular/core';
import { totCart } from '../../../models/customType';
import { LocalStorageService } from '../../../services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recap-cart',
  templateUrl: './recap-cart.component.html',
  styleUrl: './recap-cart.component.scss'
})
export class RecapCartComponent {

  localS : LocalStorageService = inject(LocalStorageService);
  rotta : ActivatedRoute = inject(ActivatedRoute);

  valoreCart! : totCart;
  pathCart! : boolean;
  obserUpdate! : Subscription;

  ngOnInit(){
    this.valoreCart =  this.localS.totaleCart(); // Chiede dati valore cart 

    let path = this.rotta.snapshot.routeConfig?.path; // Lettura rotta attuale

    // Se "cart" o "payment" cambia i bottoni
    ( path == "cart" ) ? this.pathCart = true : this.pathCart = false; 

    // Se subject fa un emissione ri-calcoli il valore ( un prodotto è stato rimosso )
    this.obserUpdate = this.localS.obserUpdate.subscribe( 
      { next : () => { this.valoreCart =  this.localS.totaleCart(); } }
    )

  }

  ngOnDestroy(){ this.obserUpdate.unsubscribe(); }



}
