import { Component, HostListener, inject } from '@angular/core';
import { RequestHttpService } from '../../../services/request-http.service';
import { prodotto } from '../../../models/customType';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent {

  listaCategorie : string[] = ["Avventura", "Azione", "Sopravvivenza"];
  listaPiattaforme : string[] = ["Pc", "Playstation", "Xbox"];

  request : RequestHttpService = inject(RequestHttpService);
  formBuilder : FormBuilder= inject(FormBuilder);

  prodotti : prodotto[] = [];

  showFilterMobile : boolean = false; // se mostrare btn per filter su mobile
  onMobile: boolean = true;           // se sei su mobile o desktop

  btnLoadMore : boolean = false;
  noProdTrovato : boolean = false;

  @HostListener('window:resize')
  onResize() { ( window.innerWidth >= 1000) ? this.onMobile = false : this.onMobile = true; }

  ngOnInit(){ this.onResize(); this.rangeProd(false);}

  toggleFilter(){ this.showFilterMobile = !this.showFilterMobile; }

  rangeProd( reset : boolean ){

    // Se chiamato dopo reset filtri svuota array prodotti filtrati e chiede nuovi non filtrati
    if( reset ){ 
      this.prodotti = []; this.showFilterMobile = false; this.noProdTrovato = false;   
    }

    // Se carichi 40 prodotti non ce ne sono altri dopo questa chiamata ( nasconde btn ) 
    if( this.prodotti.length < 40 ){ this.btnLoadMore = true; }
    else { this.btnLoadMore = false; }
   
    // Richiede un range di prodotti a intervalli da 10 ( intervallo basato su array prodotti length + 10 )
    this.request.rangeProdotti(this.prodotti.length, this.prodotti.length + 10).subscribe( 
      { next : ( dati ) => { for( let prod of dati){ this.prodotti.push(prod); } } } 
    )
  }


  filtra(){
    this.showFilterMobile = false; this.btnLoadMore = false; this.noProdTrovato = false; 
    let filtri = this.formFiltri.value;

    this.request.getProdottiFiltrati( filtri.categoria, filtri.piattaforma, filtri.prezzoMax)
    .subscribe( { 
        next : (dati) => { this.prodotti = dati; } ,
        error: (error : HttpErrorResponse ) => { if( error.status == 404 ){ this.prodotti = []; this.noProdTrovato = true; } }
        // error -- svuota array prod ( se filtri non produce risultato ma c'era un filtro già attivato)
      }
     )  
  };



  formFiltri : FormGroup= this.formBuilder.group( 
    { 
      categoria: [null, Validators.required],
      piattaforma: [null, Validators.required],
      prezzoMax: [null, Validators.required],
    }
  );

}
