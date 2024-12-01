const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('json-server/db.json'); // il file JSON che contiene i dati
const middlewares = jsonServer.defaults(); // imposta i middlewares di default

// Aggiungi i middleware di default
server.use(middlewares);

// Aggiungi un middleware personalizzato ( parametri rotta )
server.use((req, res, next) => {

  // Se presenti parametri nella query filtra i prodotti della risposta
  // ossia se c'è una chiave ( parametro ) nell'oggetto query 
  if( Object.keys(req.query).length > 0 ){  filtraProdotti( req, res); }
  else{ return next(); }

});

// Usa il router predefinito di json-server
server.use(router);

// Avvia il server
server.listen(3000, () => { console.log('JSON Server is running'); });




// • Prende lista completa prodotti dal database ( json )
// • Gli if verificano la presenza di parametri ( filtri multipli in contemporanea )
// • Ciascun parametro è convertito in minuscolo ( evita case-sensitive )
// • Filtra lista prodotti ad ogni if ( restituendo solo chi ha il parametro )

function filtraProdotti( req, res ){

  let  prodotti = router.db.get('prodotti').value();

  if( req.query.nome ){ 
    let nomeC = req.query.nome.toLowerCase();
    prodotti = prodotti.filter( singoloProd => singoloProd.nome.toLowerCase().includes(nomeC) );
  }

  if( req.query.categoria ){ 
    let categoriaC = req.query.categoria.toLowerCase();
    prodotti = prodotti.filter( singoloProd => singoloProd.categoria.toLowerCase() === categoriaC );
  }

  if( req.query.piattaforme ){ 
    let piattaformaC = req.query.piattaforme.toLowerCase();
    prodotti = prodotti.filter( singoloProd => singoloProd.piattaforme.some( singolaPiatt => singolaPiatt.toLowerCase().includes(piattaformaC)));
  }

  if( req.query.prezzo){ 
    let prezzoC = parseFloat(req.query.prezzo);
    prodotti = prodotti.filter( singoloProd => singoloProd.prezzo < prezzoC );
  }


  // Se ?start=x&end=y restituisce il range di prodotti indicato 
  // ( lo usi per limitare il numero di prodotti restituiti )
  let start = parseInt(req.query._start) || 0;
  let end = parseInt(req.query._end) || prodotti.length;
  prodotti = prodotti.slice(start,end);

  // • Ci sono dei prodotti --> risposta con prodotti filtrati
  // • Non ci sono prodotti --> risposta invia un errore 
  if (prodotti.length > 0) { return res.jsonp(prodotti); }
  else{ return res.status(404).json({ error: 'Nessun prodotto trovato con i filtri applicati'}); }

  

}





   