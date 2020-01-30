var express = require('express');
var router = express.Router();
const sql = require('mssql')
const config = {
  user: 'barletta.nicolas',  //Vostro user name
  password: 'xxx123#', //Vostra password
  server: "213.140.22.237",  //Stringa di connessione
  database: 'barletta.nicolas', //(Nome del DB)
}

/* GET users listing. */
router.get('/attori/:name', function(req, res, next) {
  sql.connect(config, err => {
    if(err) console.log(err);  // ... error check
    
    // Query
    let sqlRequest = new sql.Request();  //Oggetto che serve a creare le query
    sqlRequest.query(`select * from [dbo].[Customer] where FirstName = '${req.params.name}'`, (err, result) => {
        if (err) console.log(err); // ... error checks
        console.log(req.params.name);
        res.send(result);  //Invio il risultato
    });
  });
});

module.exports = router;