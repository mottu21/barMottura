var mysql = require('mysql');
var dataBase = function(){

}
module.exports = new dataBase();

dataBase.prototype.loadProdotti = function(req, res){
    var query = "select * from prodotti";
    eseguiQuery(req, res, query);
}

dataBase.prototype.loadOrders = function(req, res){
    var query = "select * from ordini";
    eseguiQuery(req, res, query);
}

dataBase.prototype.loadUsers = function(req, res){
    var query = "select email, nome, cognome, dataNascita, sesso, codLivello from utenti";
    eseguiQuery(req, res, query);
}


dataBase.prototype.placeOrder = function(req, res) {
    var query = "insert into ordini(quantita, email, codProdotto) values('"+req['post'].quantita+"','"+req['post'].email+"','"+req['post'].codProdotto+"')";
    eseguiNonQuery(req, res, query);
}

dataBase.prototype.createItem = function (req, res) {
    var query = "insert into prodotti(descrizione, prezzo, immagine) values('"+req['post'].descrizione+"','"+req['post'].prezzo+"','"+req['post'].immagine+"')";
    eseguiNonQuery(req, res,query);
}

dataBase.prototype.modifyItem = function(req,res){
    var query = "update prodotti set descrizione = '"+req['post'].descrizione+"', prezzo = '"+req['post'].prezzo+"', immagine = '"+req['post'].immagine+"' where codProdotto = '"+req['post'].codProdotto+"'";
    eseguiNonQuery(req, res, query);
}

dataBase.prototype.deleteItem = function(req, res){
    var query = "delete from prodotti where codProdotto = '"+req['post'].codProdotto+"'";
    eseguiNonQuery(req, res, query);
}


var eseguiNonQuery = function(req,res, query){
    var con = mysql.createConnection({host: 'localhost' , user: 'root' , password: '' , database: 'barmottura'});
    console.log("Connected to mySql");
    console.log(req['post']);
    let header = {'Content-Type': 'text/plain'};
    con.connect(function (err){
        if (!err) {
            /*var query = "insert into prodotti(descrizione, prezzo, immagine) values('"+req['post'].descrizione+"','"+req['post'].prezzo+"','"+req['post'].immagine+"')";*/
            console.log(query);
            con.query(query, function (errQ, result){
                if(!errQ) {
                    console.log(result);
                    res.writeHead(200, header);
                    res.end("200");
                }
                else {
                    res.writeHead(404, header);
                    res.end("404");
                }
            });
        }
    });
}


var eseguiQuery = function(req, res, query) {
    var con = mysql.createConnection({host: 'localhost' , user: 'root' , password: '' , database: 'barmottura'});
    console.log("Connected to mySql");
    console.log(req['post']);
    let header = {'Content-Type': 'text/plain'};
    con.connect(function(err){
        if (!err) {
            con.query(query, function(errQ, result){
                if (!errQ) {
                    var parsed = JSON.stringify(result);
                    console.log(parsed)
                    res.writeHead(200, header);
                    res.end(parsed);
                }else{
                    res.writeHead(404, header);
                    res.end("404");
                }
            })
        }else{
            res.writeHead(404, header);
            res.end("404");
        }
    });
}