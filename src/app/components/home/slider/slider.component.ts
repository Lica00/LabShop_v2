import { Component, HostListener, Input } from '@angular/core';
import { prodotto } from '../../../models/customType';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {

  @Input()
  products! : prodotto[];

  showMobile! : boolean;

  // Listener change view size ( switch mobile / desktop )
  @HostListener('window:resize')
  onResize() {
    ( window.innerWidth >= 1000) ? this.showMobile = false : this.showMobile = true; 
  }

  ngOnInit(){ this.onResize(); }


}

