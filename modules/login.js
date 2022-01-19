var crypto = require('crypto');
var mysql = require('mysql')
var user;
var level;
var login = function(){
    user = "";
    level = "";
}

login.prototype.accedi = function(req, res){
    console.log(req['post']);
    let hash = crypto.createHash('sha256');
    let _pwd = hash.update(req['post'].txtPwd).digest('hex');
    console.log(_pwd);
    var con = mysql.createConnection({host: 'localhost' , user: 'root' , password: '' , database: 'barmottura'});
    console.log('Connected to mysql');
    let header = {'Content-Type': 'text/plain'};
    con.connect(function(err){
        if(!err){
            con.query("select * from utenti where email = '"+ req['post'].txtUser +"'", function(errQ, result){
                if(!errQ){
                    res.writeHead(200, header);
                    if(result.length === 1){
                        if(result[0]['pwd'] === _pwd){
                            res.end("200");
                            user = req['post'].txtUser;
                            level = result[0]['codLivello'];
                        }
                        else{
                            res.end('201');
                        }
                    }
                    else{
                        res.end('202')
                    }
                }
                else{
                    res.writeHead(404,header);
                    res.end('404');
                }
            });
        }
        else{
            res.writeHead(404,header);
            res.end('404')
        }
    });
}

login.prototype.info = function(req, res){
    if(user != "" && level != ""){
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        let _info = {"status":200, "user": user, "level" : level}
        res.end(JSON.stringify(_info));
    }else{
        res.writeHead(404, { 'Content-Type': 'text/plain'});
        res.end("404");
    }
}

login.prototype.esci = function(req, res){
    if (user != "" && level != "") {
        user = "";
        level = "";
        res.writeHead(200, { 'Content-Type': 'text/plain'});
        res.end("200");
    }else{
        res.writeHead(404, { 'Content-Type': 'text/plain'});
        res.end("404");
    }
}



module.exports = new login();