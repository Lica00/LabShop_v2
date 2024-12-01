import { Component } from '@angular/core';
import { iconeFooter, vociFooter } from '../../models/customType';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  // hideSub --> true --> è visibile --> lo nasconde 
  // hideSub --> false --> non visibile --> lo mostra
  show( voce : vociFooter ){
    if( voce.hideSub ){ voce.hideSub = false; voce.arrow = "keyboard_arrow_up"; }
    else{ voce.hideSub = true; voce.arrow = "keyboard_arrow_down"; }
  }

  
  arrVoci : vociFooter [] = [
    { 
      titolo: "Info su di noi", arrow : "keyboard_arrow_down", hideSub : true,
      subVoci: [ "Chi siamo", "Contatti", "Lavora con noi", "Programma affiliazione"]
    },
    {
      titolo: "Trova un negozio", arrow : "keyboard_arrow_down", hideSub : true,
      subVoci: ["Gift card","Recensioni","Sconti"]
    },
    {
      titolo: "Hai bisogno di aiuto ?", arrow : "keyboard_arrow_down", hideSub : true,
      subVoci: [ "Stato dell'ordine", "Spedizione e consegna", "Politica di reso" ]
    },
    { titolo: "Maggiori informazioni",  arrow : "keyboard_arrow_down", hideSub : true,
      subVoci: [ "Termini & Condizioni", "Privacy & Cookies" ],
    }
  ]

  arrIcons : iconeFooter[] = [
    { tipo : "Social network", icone : [ "tiktok", "facebook", "video_library", "wechat"] },
    { tipo : "Pagamenti", icone : [ "paypal", "currency_bitcoin", "payment", "account_balance"] }
  ]

}

