import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, HostListener, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { formPagamento } from '../../../models/customType';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

  private formBuilder = inject(FormBuilder);
  localS : LocalStorageService = inject(LocalStorageService);
  router : Router = inject(Router);

  stepForm! : formPagamento[];

  orderComplete : boolean = false;
  onDesktop! : boolean;
  orient! : StepperOrientation;
  
  // E' in ascolto cambi width viewport ( cambio mobile - desktop )
  @HostListener('window:resize')
  onResize() {
    if( window.innerWidth >= 1000){ this.orient = "horizontal"; this.onDesktop = true; }
    else{ this.orient = "vertical"; this.onDesktop = false; };
  }

  ngOnInit(){ 
    this.onResize(); // 1° lettura width viewport ( altrimenti legge solo a un cambio width)
    this.createStepForm();  // Creato nel hook ( errore get() --> form non inizializzato ) 
  }


  createStepForm(){

    this.stepForm =  [
      {
        labelStep: 'Dati Spedizione',
        formGroup: this.formBuilder.group({
          name:     ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s'-]{2,}$/)] ],                            // Min. 2 caratteri - no numeri 
          lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s'-]{2,}$/)] ],                            // Min. 2 caratteri - no numeri 
          address:  ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s,.'-]{3,}$/)] ],                          // Min. 3 caratteri - si numeri
          cap:      ['', [Validators.required, Validators.pattern(/^\d{5}$/)] ],                                          // Ha 5 caratteri ( 0 - 9)
          email:    ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/)] ], // Min 1 carattere + @ + caratteri 
          tele:     ['', [Validators.required, Validators.pattern(/^3[0-9]{8,9}$/)] ],                                    // Prefisso 3 + 8/9 cifre ( 0 - 9 )
        }),
        fields: [
          { label: 'Nome', name: 'name', type: 'text' },
          { label: 'Cognome', name: 'lastName', type: 'text' },
          { label: 'Indirizzo', name: 'address', type: 'text' },
          { label: 'Cap', name: 'cap', type: 'number' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Numero di telefono', name: 'tele', type: 'tel' },
        ],
      },
      {
        labelStep: 'Dati Pagamento',
        formGroup: this.formBuilder.group({
          number:  ['', [Validators.required, Validators.pattern(/^\d{16}$/)] ],                 // Sequenza numerica da 16 cifre 
          expired: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{4}$/)] ], // Formato mm//yyyy ( 0 - 12 + / + 4 cifre )
          cvv:     ['', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]],                // Ha 3 cifre ( 0 - 9 )
        }),
        fields: [
          { label: 'Numero carta', name: 'number', type: 'number' },
          { label: 'Scadenza (mm/yyyy)', name: 'expired', type: 'text' },
          { label: 'CVV', name: 'cvv', type: 'text' },
        ],
      },
    ];
  }


  completato(){
    this.orderComplete = true; // comparsa <div> ordine completo 
    this.localS.svuotaCart(); 

    // redirect a home dopo 5 s
    setTimeout( () => { this.router.navigateByUrl('/home'); }, 5000 )
  }

}
