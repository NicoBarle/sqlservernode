var express = require('express');
var router = express.Router();
const sql = require('mssql')
const config = {
  user: 'barletta.nicolas',  //Vostro user name
  password: 'xxx123#', //Vostra password
  server: "213.140.22.237",  //Stringa di connessione
  database: 'barletta.nicolas', //(Nome del DB)
}

let executeQuery = function (res, query, next) {
  sql.connect(config, function (err) {
    if (err) { //Display error page
      console.log("Error while connecting database :- " + err);
      res.status(500).json({success: false, message:'Error while connecting database', error:err});
      return;
    }
    var request = new sql.Request(); // create Request object
    request.query(query, function (err, result) { //Display error page
      if (err) {
        console.log("Error while querying database :- " + err);
        res.status(500).json({success: false, message:'Error while querying database', error:err});
        sql.close();
        return;
      }
      mandaAlPug(res, result.recordset);
      return;
    });

  });
}

let mandaAlPug = function(res, recordset){
    let re = recordset[0];
    res.render('dettagli', {
        title: 'Singola Unità',
        re: re
    })
}

/* GET home page. */
router.get('/:Unit', function(req, res, next) {
  let sql = `select * from dbo.[cr-unit-attributes] where Unit = '${req.params.Unit}'`;
  executeQuery(res, sql, next);
});

module.exports = router;
