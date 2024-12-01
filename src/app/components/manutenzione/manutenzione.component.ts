import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-manutenzione',
  templateUrl: './manutenzione.component.html',
  styleUrl: './manutenzione.component.scss'
})
export class ManutenzioneComponent {

 
  rotta : ActivatedRoute = inject(ActivatedRoute);
  manutenzione : boolean = true;

  // Se rotta ha "manuten.."      --> la pagina a cui navighi non è disponibile  ( in manutenzione )
  // Se rotta non ha "manuten.."  --> la rotta digitata è errata                 ( pagina non trovata )
  ngOnInit(){
    let rotta = this.rotta.snapshot.routeConfig?.path;
    if( rotta != "manutenzione"){ this.manutenzione = false; }
  }


}
