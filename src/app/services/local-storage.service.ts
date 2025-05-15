import { Injectable } from '@angular/core';
import { prodotto, totCart } from '../models/customType';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Aggiunge prod. in array nel localStorage
  addProduct(prodotto : prodotto) : void{
    let prodS = localStorage.getItem('prodotti');                           // Legge prod già salvati nel localStorage   
    let prodotti: prodotto[] = prodS ? JSON.parse(prodS) : [];              // Converte prod già salvati in obj -- altrimenti crea array vuoto
    let esistente = prodotti.find( (p) => { return p.id === prodotto.id } ) // Verifica se c'è un prodotto identico nel carrello ( confronto id  )

    if( !esistente ){                                               // Se non c'è un prodotto identico: 
      prodotti.push(prodotto);                                      // Inserisce nuovo prodotto in array
      localStorage.setItem('prodotti', JSON.stringify(prodotti));   // Salva array 
    }

  }

  // Restituisce tutti i prodotti salvati nel localStorage 
  getAllProducts(): prodotto[] {
    let prodS = localStorage.getItem('prodotti');
    return prodS ? JSON.parse(prodS) : [];
  }

  // rimuove un prodotto dal localStorage
  removeProduct( id: string) : void {
    let allP = this.getAllProducts().filter( (prod) => { return prod.id !== id} );   // Legge prodotti ed esclude quello con l'id indicato
    localStorage.setItem('prodotti', JSON.stringify(allP));                          // Salva il nuovo array
  }


  // Calcola il costo attuale del carrello 
  totaleCart() : totCart{

    // assegni 0 per ricalcolare costo da zero ( es: prodotto rimosso )
    let subT : number = 0; 
    let sped : number = 0; 
    let totCart : number = 0; 

    let prodCart : prodotto[] = this.getAllProducts();

    for( let p of prodCart){  
      subT +=  Math.floor(p.price * 100) / 100;   // Arrotonda a 2° cifra decimale
      sped += 5;                                  // Ogni prod aggiunge 5 di spedizione
    }     

    totCart = subT + sped;
    let valoreCart : totCart  = { subTotale : subT, spedizione : sped, totaleCart : totCart};
    return valoreCart;

  }


  // Usato per aggiornare comp. "recap-cart" se un prodotto è rimosso in comp. "recap-prod"
  obserUpdate : Subject<void> = new Subject<void>();
  
  // Rimuove tutti i prodotti 
  svuotaCart() : void {
    localStorage.setItem('prodotti', JSON.stringify([]));  // Sovrascrive attuale con un array vuoto
  }


} 
