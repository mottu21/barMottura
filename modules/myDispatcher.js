var url = require('url');
var fs = require('fs');
var queryString = require('querystring');
var mime = require('mime');
//-------------------------------------------------------------------------
var HTTPdispatcher = function() {
    this.listeners = {get:{}, post:{}, delete:{}, put:{}};
};
//-------------------------------------------------------------------------
HTTPdispatcher.prototype.addListener = function (method, resource, callback) {
    this.listeners[method.toLowerCase()][resource] = callback;
};
//-------------------------------------------------------------------------
HTTPdispatcher.prototype.showList = function() {
    console.log("Recorded Listeners:")
    for (var key in this.listeners) 
        for (var subkey in this.listeners[key]){console.log(key + ":" + subkey);}   
};
//----------------------------------------------------------------------------------
HTTPdispatcher.prototype.staticListener = function(req, res){
    var resource = url.parse(req.url).pathname;
    if (resource == '/') resource = "/login.html";
    var filename = "./static" + resource;
    console.log(resource)
    //var self = this;
    fs.readFile(filename,(err, content) => {
        if (!err){                       
            res.writeHead(200, {"Content-Type": mime.getType(filename)});
            res.end(content);
        }    
        else 
            this.errorListener(req, res);
    });
};
//---------------------------------------------------------------------------------
HTTPdispatcher.prototype.errorListener = function(req, res) {
    fs.readFile("./static/error.html", function(err, content) {
        res.writeHead(404,{"Content-Type": 'text/html;charset=utf-8'});
        if (err) content = "<h1>Missing Error Page</h1>"
        res.end(content);
    });
};
//-------------------------------------------------------------------------
HTTPdispatcher.prototype.GET = function(req, res){
    try{
        var parsedUrl = url.parse(req.url,true);
        req['get'] = parsedUrl.query;
        if (parsedUrl.pathname in this.listeners['get']) 
            this.listeners['get'][parsedUrl.pathname](req, res);
        else
            this.staticListener(req, res);
    }catch{
        this.errorListener(req, res);
    }
}
//---------------------------------------------------------------------------------
HTTPdispatcher.prototype.POST = function(req, res) {   
    var body = "";
    //let self = this;
    req.on("data", function(data) {
        body += data;
    });
    req.on("end", () => {
        try{
            var parsedUrl = url.parse(req.url,true);
            req['post'] =  queryString.parse(body);
            this.listeners['post'][parsedUrl.pathname](req, res);	
        }catch{
            this.errorListener(req, res);
        }
    });
}
//---------------------------------------------------------------------------------
HTTPdispatcher.prototype.dispatch = function(req, res) {
    switch (req.method.toLowerCase()){ 
        case "get":
            this.GET(req, res);
        break;
        case "post":
            this.POST(req, res);
        break;
        case "delete":
        break;
        case "put":
        break;
        default:
            this.errorListener(req, res);
    }    
}
//---------------------------------------------------------------------------------
module.exports = new HTTPdispatcher();