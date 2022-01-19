/*!
* Start Bootstrap - Shop Homepage v5.0.4 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
$(document).ready(function(){
    //login//
    $("#btnLogin").click(function(){
        $.post("/login", {"txtUser": $("#user").val(), "txtPwd": $("#pwd").val()}, 
        function(data){
            if(data === "200"){
                document.location.href="index.html";
            }
        });
    });
////////////////////////////////
    //register//
    $("#btnRegister").click(function(){
        console.log("Qui arriva");
        $.post("/register", {"txtEmail": $("#txtEmail").val(), "txtPsw": $("#txtPsw").val(), "txtNome": $("#txtNome").val().toUpperCase(), 
        "txtCognome": $("#txtCognome").val().toUpperCase(), "txtData": $("#txtData").val(), "txtSesso": $("#txtSesso").val() }, 
        function(data){
            console.log(data);
            if(data === "200"){
                document.location.href="login.html";
            }
        });
    });
});