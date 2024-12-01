import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestHttpService } from '../../../services/request-http.service';
import { prodotto } from '../../../models/customType';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent {

  rotta : ActivatedRoute = inject(ActivatedRoute);
  request : RequestHttpService = inject(RequestHttpService);
  formBuilder : FormBuilder = inject(FormBuilder);

  showPopUp : boolean = false;
  prodottoPop! : prodotto; // passato a comp. addCart
  prodotto! : prodotto;
  arrProducts : prodotto[] = []; // passato a comp. promo

  
  ngOnInit(){

    // Observable rileva cambi nel parametro della rotta ( se cambia richiede nuovo prodotto )
    this.rotta.paramMap.subscribe( 
      { next : ( dati ) => { 
          let id = dati.get("id"); // Lettura parametro attuale
          this.request.getByID(id!).subscribe(  // Richiesta dati prodotto
            { next : ( dati ) => { this.prodotto = dati; } }
          )
        } 
      }
    )

    // Chiede dati 3 prodotti casuali 
    let nRandom : number = Math.floor(Math.random() * 41 );
    
    this.request.rangeProdotti( nRandom, nRandom + 3 ).subscribe(
      { next : (dati) => {  this.arrProducts = dati; } }
    )
  }



  addToCart(){ 

    // Le select diventano rosse se form invalid
    if( this.form.valid ){

      this.showPopUp = true;

      // clona prodotto ( altrimenti copia ref. )
      this.prodottoPop = structuredClone(this.prodotto);

      // Modifica prodotto ( array plat / vers contiene solo quella scelta)
      this.prodottoPop.piattaforme = [ this.form.value.platform];
      this.prodottoPop.versioni = [ this.form.value.version];
      
      // Rimuove comp. addCart dopo 6 secondi ( dopo 5s è rimosso esteticamente )
      setTimeout( () => { this.showPopUp = false; }, 6000)
    }

  }

  form : FormGroup  = this.formBuilder.group( 
    { 
      version: [null, Validators.required], 
      platform: [null, Validators.required],
    }
  );

}
