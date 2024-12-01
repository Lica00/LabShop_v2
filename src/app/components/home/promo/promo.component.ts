import { Component, Input } from '@angular/core';
import { prodotto } from '../../../models/customType';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrl: './promo.component.scss'
})
export class PromoComponent {

  @Input()
  products! : prodotto[];

}
