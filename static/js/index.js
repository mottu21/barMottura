var index = 0;
var email = "";
var livello = "";
var _qta = 0;
var ordini = [];
$(document).ready(function() {
    
    //quantita - email - codProdotto - descrizioneProdotto
    //codProdotto - Descrizione - quantita - btnElimina

    $.get("/getInfo")
        .done( function(data) {
        let parsed = JSON.parse(data);
        if(parsed.status == "200"){
            $("#infoUser").text(parsed.user);
            $("#infoLevel").text(parsed.level);
            email = parsed.user;
            livello = parsed.level;
            if(livello<2){
                $(".manage").addClass("disabled");
            }
        }
    })
    .fail( function(){
        document.location.href="login.html";
    });
    //loadProdotti//
    $.get("/loadProdotti", function(data){
        //console.log(data);
        let parsed = JSON.parse(data);
        //console.log(parsed);
        for(let i = 0; i < parsed.length; i++){
            let _img= "";
            if (parsed[i].immagine == "") {
                _img = "https://dummyimage.com/450x300/dee2e6/6c757d.jpg";
            }else{
                _img = parsed[i].immagine;
                if (!_img.includes("http")) {
                    _img = "assets/"+_img;
                }
                //console.log(_img);
            }
            $bodyPart ="<div class=\"col mb-5\">"+
            "<div class=\"card h-100\">"+
                "<img class=\"card-img-top\" src=\""+_img+"\" />"+
                "<div class=\"card-body p-4\">"+
                    "<div class=\"text-center \">"+
                        "<h5 class=\"fw-bolder\" id = 'descr_"+parsed[i].codProdotto+"'>"+parsed[i].descrizione+"</h5>"+
                       "€ "+parsed[i].prezzo+
                    "</div>"+
                    "<div class='text-center'>"+
                        "<input type='text' placeholder = 'Quantity' id='qta_"+parsed[i].codProdotto+"' class=\"form-control text-center mt-2 rounded-pill\" />"+
                    "</div>"+
                "</div>"+
                "<div class=\"card-footer p-4 pt-0 border-top-0 bg-transparent\">"+
                    "<div class=\"text-center\"><a class=\"btn btn-outline-dark mt-auto rounded-pill addCart\" id='btn_"+parsed[i].codProdotto+"'>Add to cart</a></div>"+
                "</div>"+
            "</div>"+
        "</div>";
        $("#mainSection").append($bodyPart);
        }
    });

    //logout//
    $("#btnLogout").click(function(){
        $.get("/logout", function(data){
            if (data === "200") {
                document.location.href = "login.html";
                email="";
                livello="";
            }else{
                console.log("Errore --> "+data);
            }
        });
    });

    //add to cart//
    $(document).on('click',".addCart", function(){
        var btnId = $(this).attr("id");
        var _id = btnId.split("_");
        var row = {"email": email, "codProdotto" : _id[1], "quantita" : $("#qta_"+_id[1]).val(), "descrizione" : $("#descr_"+_id[1]).text()};
        _qta += parseInt($("#qta_"+_id[1]).val());
        ordini[index] = row;
        index++;
        $("#cartItems").text(_qta);
        $("#qta_"+_id[1]).val("");
        $cartPart = "<div class='row mx-4 fs-5 align-middle' id='codPart_"+row.codProdotto+"'>"+
                        "<div class='col-12'>"+
                            "Prodotto: <b>"+row.descrizione+"</b>"+
                        "</div>"+
                        "<div class='col-12'>"+
                            "Quantità: <b>"+row.quantita+"</b>"+
                        "</div>"+
                        "<div class='col-3 '><hr/> </div>"+
                        "<div class='col-12'><button class='btn btn-outline-dark rounded-circle delete' id='delete_"+row.codProdotto+"'><i class='bi bi-trash'></i></button></div>"+
                        "<div class='col-12 px-5'><hr/><hr/></div>"+
                    "</div>";
        //console.log(JSON.stringify(ordini));
        $("#modalCartBody").append($cartPart);
        $("#dynamicInfoText").html("Items Added Successfully   <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'>");
        $("#modalSuccess").modal("show");
    });

    //place an order//
    $("#btnPlaceOrder").on("click", function(){
        for(let i = 0; i <ordini.length; i++){
            if (ordini[i].codProdotto != "") {
                $.post("/placeOrder", ordini[i], function(data){
                    if (data === "200") {
                        console.log("ok");
                    }
                });
            }
        }
        ordini = [];
        _qta = 0;
        index = 0;
        $("#cartItems").text(_qta);
        $("#modalCartBody").empty();
        $("#modalCart").modal("hide");
        $("#dynamicInfoText").html("Order Confirmed   <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'>");
        $("#modalSuccess").modal("show");
    });


    //delete something from the cart//
    $(document).on("click" ,".delete", function(){
        console.log("qui arriva");
        var btnId = $(this).attr("id");
        var _id = btnId.split("_");
        let j = 0;
        let done = false;
        do{
            if(ordini[j].codProdotto == _id[1]) {
                _qta = _qta - parseInt(ordini[j].quantita);
                $("#cartItems").text(_qta);
                done = true;
            }
            else{
                j++;
            }
        }while(!done && j < index);
        if (done) {
            ordini[j] = "";
            $("#codPart_"+_id[1]).remove();
        }
    });
});