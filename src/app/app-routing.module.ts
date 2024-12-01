import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { AllProductsComponent } from './components/products/all-products/all-products.component';
import { SingleProductComponent } from './components/products/single-product/single-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/checkout/cart/cart.component';
import { PaymentComponent } from './components/checkout/payment/payment.component';
import { ManutenzioneComponent } from './components/manutenzione/manutenzione.component';
import { canLeaveGuard } from './guard/can-leave.guard';
import { canEnterGuard } from './guard/can-enter.guard';




const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "home", component: HomeComponent },
  { path: "products", component: ProductsComponent,
    children: [ 
      { path: "", redirectTo: "all", pathMatch: "full"}, // localhost/products ( redirect products/all )
      { path: "all", component: AllProductsComponent },
      { path: "item/:id", component: SingleProductComponent }
    ]
  },
  { path: "checkout", component: CheckoutComponent,
    children: [
      { path: "", redirectTo: "cart", pathMatch: "full"}, //  localhost/checkout ( redirect checkout/cart )
      { path: "cart", component: CartComponent },
      { path: "payment", component: PaymentComponent, canDeactivate: [canLeaveGuard], canActivate: [canEnterGuard]} 
    ]
  },
  { path: "manutenzione", component: ManutenzioneComponent},
  { path: "**", component: ManutenzioneComponent}, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
