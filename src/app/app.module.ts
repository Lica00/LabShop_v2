import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/header/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { HeroBannerComponent } from './components/home/hero-banner/hero-banner.component';
import { SliderComponent } from './components/home/slider/slider.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavMobileComponent } from './components/header/nav-mobile/nav-mobile.component';
import { PromoComponent } from './components/home/promo/promo.component';
import { ProductsComponent } from './components/products/products.component';
import { AllProductsComponent } from './components/products/all-products/all-products.component';
import { SingleProductComponent } from './components/products/single-product/single-product.component';
import { CartComponent } from './components/checkout/cart/cart.component';
import { PaymentComponent } from './components/checkout/payment/payment.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ManutenzioneComponent } from './components/manutenzione/manutenzione.component';
import { AddCartComponent } from './components/products/single-product/add-cart/add-cart.component';
import { RecapCartComponent } from './components/checkout/recap-cart/recap-cart.component';
import { RecapProdComponent } from './components/checkout/recap-prod/recap-prod.component';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// ng-bootstrap 
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

// angular-material
import {MatIconModule } from "@angular/material/icon";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    HomeComponent,
    HeroBannerComponent,
    FooterComponent,
    SliderComponent,
    NavMobileComponent,
    PromoComponent,
    ProductsComponent,
    AllProductsComponent,
    SingleProductComponent,
    CartComponent,
    PaymentComponent,
    CheckoutComponent,
    ManutenzioneComponent,
    AddCartComponent,
    RecapCartComponent,
    RecapProdComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    MatIconModule, 
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatSliderModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
