import { FormGroup } from "@angular/forms";


export type prodotto = 
    {
        id: string,
        nome: string,
        categoria: string,
        prezzo: number,
        versioni: string [],
        piattaforme: string [],
        info: { titolo : string, contenuto1: string, contenuto2 : string } 
    }
;

export type totCart = { subTotale : number, spedizione : number,  totaleCart : number }

export type vociFooter = { titolo : string, subVoci : string[], hideSub : boolean, arrow : string }

export type iconeFooter = { tipo : string, icone : string[] }

export type formField = { label : string, name : string, type : string };
export type formPagamento = { labelStep : string, formGroup : FormGroup, fields : formField[] };

