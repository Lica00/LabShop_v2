import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { prodotto } from '../models/customType';


@Injectable({
  providedIn: 'root'
})
export class RequestHttpService {

  constructor() {}
  http : HttpClient = inject(HttpClient);
  url : string = "http://localhost:8081/game";

  getAll() : Observable<prodotto[]> {
    return this.http.get<prodotto[]>( this.url + "/all" );
  }

  getByID( id : string ): Observable<prodotto> {
    return this.http.get<prodotto>( this.url + "/" + id );
  }

  rangeProdotti(x : number, y : number): Observable<prodotto[]>{
    return this.http.get<prodotto[]>(`${this.url}/range?start=${x}&end=${y}`);
  } 


  // Cerca un prodotto avente nel nome la stringa indicata
  getSearch( nome : string): Observable<prodotto[]>{
    return this.http.get<prodotto[]>(`${this.url}/search?text=${nome}`);
  } 

  getProdottiFiltrati( cat : number, plat : number, price : number ) : Observable<prodotto[]>{

    let query : string = "?";
    const parametri : string[] = [];

    if( cat != null ){ parametri.push(`cat=${cat}`); }

    if( plat != null){ parametri.push(`plat=${plat}`); }

    if( price != null){ parametri.push(`price=${price}`); }

    // converte tutti gli elementi dell'array in stringa separandoli con &
    // se c'è un solo elemento è convertito in stringa senza usare separatore
    // ( hai la certezza che almeno 1 filtro sia applicato perché disattivi il pulsante )
    query += parametri.join("&");
    
    return this.http.get<prodotto[]>( this.url + "/filter"+ query );
  }




}
