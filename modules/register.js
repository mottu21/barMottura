var crypto = require('crypto');
var mysql = require('mysql');
var register = function(){

}
register.prototype.registra = function(req,res){
    //console.log(req['post'].txtPsw);
    let hash = crypto.createHash('sha256');
    let _pwd = hash.update(req['post'].txtPsw).digest('hex');
    //console.log(_pwd);
    var con = mysql.createConnection({host: 'localhost', user: 'root', password: '', database: 'barmottura'});
    console.log("Connected to mysql");
    let header = {'Content-Type': 'text/plain'};
    con.connect(function(err){
        if(!err){
            con.query("insert into utenti(email, pwd, nome, cognome, dataNascita, sesso, codLivello) values("+
            "'"+req['post'].txtEmail+"','"+_pwd+"','"+req['post'].txtNome+"','"+req['post'].txtCognome+"','"+
            req['post'].txtData+"','"+req['post'].txtSesso+"','1')", function(errQ, result) {
                if (!errQ){
                    res.writeHead(200, header);
                    res.end("200");
                }else{
                    res.writeHead(404, header);
                    res.end("404");
                }
            });
        }else{
            res.writeHead(404, header);
            res.end("404");
        }
    });
}

module.exports = new register();