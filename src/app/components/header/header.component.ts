import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',

})
export class HeaderComponent {

  showSearchBar : boolean = false;
  showNavMobile : boolean = false;

  // inserisce o rimuove componente search dal dom 
  toggleSearch(){ ( this.showSearchBar ) ? this.showSearchBar = false : this.showSearchBar = true; }

  // inserisce o rimuove componente nav-mobile dal dom 
  toggleMobile(){ ( this.showNavMobile ) ? this.showNavMobile = false : this.showNavMobile = true;  }



}
