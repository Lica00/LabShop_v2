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
  prodotto! : prodotto;
  arrProducts : prodotto[] = []; // passato a comp. promo

  
  ngOnInit(){

    // Observable rileva cambi nel parametro della rotta ( se cambia richiede nuovo prodotto )
    this.rotta.paramMap.subscribe( 
      { next : ( dati ) => { 
          let id = dati.get("id"); // Lettura parametro attuale
          this.request.getByID(id!).subscribe(  // Richiesta dati prodotto
            { next : ( dati ) => { 
              this.prodotto = dati;
               this.form.patchValue({ version: this.prodotto.category.name, platform: this.prodotto.platform.name });
            } }
          )
        } 
      }
    )

    // Chiede dati 3 prodotti casuali 
    let nRandom : number = Math.floor(Math.random() * 41 );
    
    this.request.rangeProdotti( nRandom, nRandom + 2 ).subscribe(
      { next : (dati) => {  this.arrProducts = dati; } }
    )
  }



  addToCart(){ 
    this.showPopUp = true;

    // Rimuove comp. addCart dopo 6 secondi ( dopo 5s è rimosso esteticamente )
    setTimeout( () => { this.showPopUp = false; }, 6000)
  }

  form : FormGroup  = this.formBuilder.group( 
    { 
      version: [{ value: null, disabled: true }, Validators.required], 
      platform:[{ value: null, disabled: true }, Validators.required],
    }
  );

}
