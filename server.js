var http = require('http');
var url = require('url');
var dispatcher = require('./modules/myDispatcher');
var login = require("./modules/login");
var register = require("./modules/register");
var myDataBase = require("./modules/dataBase");
var server = http.createServer(function(req, res){
    dispatcher.dispatch(req, res);
});
server.listen(8080);
//
dispatcher.addListener('post', '/login', login.accedi);
dispatcher.addListener('post', '/register', register.registra);
dispatcher.addListener('get', '/getInfo', login.info);
dispatcher.addListener('get', '/logout', login.esci);
//
dispatcher.addListener('get', '/loadProdotti', myDataBase.loadProdotti);
dispatcher.addListener('get', '/loadOrders', myDataBase.loadOrders);
dispatcher.addListener('get', '/loadUsers', myDataBase.loadUsers)
//
dispatcher.addListener('post', '/placeOrder', myDataBase.placeOrder);
//
dispatcher.addListener('post', '/createItem', myDataBase.createItem);
dispatcher.addListener('post', '/modifyItem', myDataBase.modifyItem);
dispatcher.addListener('post', '/deleteItem', myDataBase.deleteItem);
dispatcher.showList();
