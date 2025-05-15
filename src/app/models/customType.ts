import { FormGroup } from "@angular/forms";


export type prodotto = 
    {
        id: string,
        name: string,
        descr1 : string,
        descr2 : string,
        price: number,
        category: { id: number, name : string },
        platform: { id: number, name : string },
    }
;


export type totCart = { subTotale : number, spedizione : number,  totaleCart : number }

export type vociFooter = { titolo : string, subVoci : string[], hideSub : boolean, arrow : string }

export type iconeFooter = { tipo : string, icone : string[] }

export type formField = { label : string, name : string, type : string };
export type formPagamento = { labelStep : string, formGroup : FormGroup, fields : formField[] };

