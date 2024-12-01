import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { inject } from '@angular/core';

export const canEnterGuard: CanActivateFn = (route, state) => {

  let localS : LocalStorageService = inject(LocalStorageService);
  let router : Router = inject(Router);

  // Almeno 1 prodotto nel carrello --> navighi alla rotta
  // Nessun prodotto nel carrello   --> navighi a cart 
  if( localS.getAllProducts().length > 0 ){ return true}
  else{ router.navigateByUrl('checkout/cart'); return false; }


};
