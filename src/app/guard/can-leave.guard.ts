import { CanDeactivateFn } from '@angular/router';
import { PaymentComponent } from '../components/checkout/payment/payment.component';
import { FormGroup } from '@angular/forms';

export const canLeaveGuard: CanDeactivateFn<PaymentComponent> = (component) => {

  let orderComplete : boolean = component.orderComplete;
  let formSpedizione : FormGroup = component.stepForm[0].formGroup;
  let formPagamento : FormGroup = component.stepForm[1].formGroup;

  // Form validi e ordine completato ( no conferma )
  if( formSpedizione.valid && formPagamento.valid && orderComplete ){ return true; } 
  
  // Form no validi si dirty ( chiede conferma )
  if( formSpedizione.dirty || formPagamento.dirty ){ return window.confirm("Vuoi lasciare la pagina?"); }

  // Form no validi no dirty ( no conferma )
  return true;

};
