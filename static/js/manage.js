var email = "";
var livello = "";

$(document).ready(function(){

    //get info
    $.get("/getInfo")
    .done(function(data) {
            let parsed = JSON.parse(data);
            if(parsed.status == "200"){
                $("#infoUser").text(parsed.user);
                $("#infoLevel").text(parsed.level);
                email = parsed.user;
                livello = parsed.level;
                if (livello < 2) {
                    document.location.href = "index.html";
                }
            }
        })
    .fail(function() {
        document.location.href = "login.html";
    });


    $.get("/loadUsers").done(function(data) {
        let parsed = JSON.parse(data);
        let $tr;
        let $th;
        let $td;
        $tr = "<tr id='rowHeadUser'></tr>";
        $("#tabHeadUser").append($tr);
        for(let key in parsed[0]){
            console.log(key);
            console.log($tr);
            $th = "<th scope = 'col' class='text-center'>"+key+"</th>";
            $("#rowHeadUser").append($th);
        }
        for(let i = 0; i<parsed.length; i++){
            $tr = "<tr id='rowUser_"+i.toString()+"'></tr>";
            $("#tabBodyUser").append($tr);
            for(let key in parsed[i]){
                if (key == "email") {
                    $th = "<th scope = 'col' class='text-center'>"+parsed[i].email+"</th>";
                    $("#rowUser_"+i.toString()).append($th);
                }else
                {
                    let $val = parsed[i][key];
                    if (key == "dataNascita") {
                        let date = new Date($val);
                        $val = date.toLocaleDateString('en-US');
                    }
                    $td = "<td id='"+key+"_"+i.toString()+"' class='text-center'>"+$val+"</td>";
                    $("#rowUser_"+i.toString()).append($td);
                }
               
            }
        }
        $("#tabUser").DataTable();
    })
    .fail(function(data) {
        alert("failed to load user");
    });



    //loadProdotti//
    $.get("/loadProdotti", function(data){
        //console.log(data);
        let parsed = JSON.parse(data);
        //console.log(parsed);
        for(let i = 0; i < parsed.length; i++){
            let $accordionItem="<div class='accordion-item' id='accordionProduct_"+parsed[i].codProdotto+"'>"+
            "<h2 class='accordion-header' id='heading_"+parsed[i].codProdotto+"'>"+
              "<button class='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapse_"+parsed[i].codProdotto+"' aria-expanded='true' aria-controls='collapse_"+parsed[i].codProdotto+"'>"+
                parsed[i].descrizione+
              "</button>"+
            "</h2>"+
            "<div id='collapse_"+parsed[i].codProdotto+"' class='accordion-collapse collapse ' aria-labelledby='heading_"+parsed[i].codProdotto+"' data-bs-parent='#accordionItems'>"+
              "<div class='accordion-body'>"+
                "<div class='row'>"+
                  "<p class='col-5'>"+
                      "<label class='form-label text-secondary' for='codProdotto_"+parsed[i].codProdotto+"'>Codice Prodotto: </label>"+
                      "<input type='text' class='form-control' id='codProdotto_"+parsed[i].codProdotto+"'value='"+parsed[i].codProdotto+"' readonly/>"+
                  "</p>"+
                  "<p class='col-5'>"+
                      "<label class='form-label text-secondary' for='descrizione_"+parsed[i].codProdotto+"'>Descrizione Prodotto: </label>"+
                      "<input type='text' class='form-control' id='descrizione_"+parsed[i].codProdotto+"' placeholder='' value='"+parsed[i].descrizione+"' readonly/>"+
                  "</p>"+
                  "<p class='col-5'>"+
                      "<label class='form-label text-secondary' for='prezzo_"+parsed[i].codProdotto+"'>Prezzo: €</label>"+
                      "<input type='text' class='form-control' id='prezzo_"+parsed[i].codProdotto+"' placeholder='' value='"+parsed[i].prezzo+"' readonly/>"+
                  "</p>"+
                  "<p class='col-5'>"+
                      "<label class='form-label text-secondary' for='immagine_"+parsed[i].codProdotto+"'>Immagine: </label>"+
                      "<input type='text' class='form-control' id='immagine_"+parsed[i].codProdotto+"' placeholder='' value='"+parsed[i].immagine+"' readonly/>"+
                  "</p>"+
                  "<p class='d-flex'>"+
                      "<button class='btn btn-outline-dark rounded-pill me-2 modify' type='button' id='modify_"+parsed[i].codProdotto+"'>"+
                          "<i class='bi bi-pencil-square'></i>"+
                          "Edit"+
                      "</button>"+
                      "<button class='btn btn-outline-dark rounded-pill delete' type='button' id='delete_"+parsed[i].codProdotto+"'>"+
                          "<i class='bi bi-trash'></i>"+
                          "Delete"+
                      "</button>"+
                  "</p>"+
                "</div>"+
              "</div>"+
            "</div>"+
          "</div>";
          $("#accordionItems").append($accordionItem);
        }
    });

    //loadOrders//
    $.get("/loadOrders")
    .done(function(data) {
            let parsed = JSON.parse(data);
            let $tr;
            let $th;
            let $td;
            $tr = "<tr id='rowHead'></tr>";
            $("#tabHead").append($tr);
            for(let key in parsed[0]){
                console.log(key);
                console.log($tr);
                $th = "<th scope = 'col' class='text-center'>"+key+"</th>";
                $("#rowHead").append($th);
            }
            for(let i = 0; i<parsed.length; i++){
                $tr = "<tr id='row_"+parsed[i].codOrdine+"'></tr>";
                $("#tabBody").append($tr);
                for(let key in parsed[i]){
                    if (key == "codOrdine") {
                        $th = "<th scope = 'col' class='text-center'>"+parsed[i].codOrdine+"</th>";
                        $("#row_"+parsed[i].codOrdine).append($th);
                    }else
                    {
                        let $val = parsed[i][key];
                        if (key == "dataOrdine") {
                            let date = new Date($val);
                            $val = date.toLocaleDateString('en-US');
                        }else
                        {
                            if (key == "consegnato") {
                                if ($val == "0") {
                                    $val = "<input class='form-check-input' type='checkbox' id='flexCheckChecked'>";
                                }
                                else{
                                    $val = "<input class='form-check-input' type='checkbox' id='flexCheckChecked' checked readonly>";
                                }
                                
                            }
                        }
                        $td = "<td id='"+key+"_"+parsed[i].codOrdine+"' class='text-center'>"+$val+"</td>";
                        $("#row_"+parsed[i].codOrdine).append($td);
                    }
                   
                }
            }
            $("#tab").DataTable();
    })
    .fail(function(data) {
            alert("failed to load");
    });



    //create a new item
    $("#btnAddItem").on("click", function(){
        let dataItem={
            "descrizione": $("#descrizioneAdd").val().toUpperCase(),
            "prezzo" : parseFloat($("#prezzoAdd").val()),
            "immagine" : $("#immagineAdd").val()
        }
        $.post("/createItem", dataItem)
            .done(function(data){
                document.location.reload();
            });
    });

    //logout//
    $("#btnLogout").click(function(){
        $.get("/logout", function(data){
            if (data === "200") {
                document.location.href = "login.html";
            }else{
                console.log("Errore --> "+data);
                email="";
                livello="";
            }
        });
    });

    //modify an item//
    $(document).on("click",".modify",function(){
        let _id=$(this).attr("id");
        let arr = _id.split("_");
        /*$("#descrizione_"+arr[1]).removeAttr("readonly");
        $("#prezzo_"+arr[1]).removeAttr("readonly");
        $("#immagine_"+arr[1]).removeAttr("readonly");*/
        if ($(this).html() == "<i class=\"bi bi-pencil-square\"></i>Edit")
        {
            $(this).html("<i class=\"bi bi-check-lg\"></i>");
            $("#delete_"+arr[1]).html("<i class=\"bi bi-x-lg\"></i>");
            $("#descrizione_"+arr[1]).removeAttr("readonly");
            $("#prezzo_"+arr[1]).removeAttr("readonly");
            $("#immagine_"+arr[1]).removeAttr("readonly");
        }
        else{
            if ($(this).html() == "<i class=\"bi bi-check-lg\"></i>") 
            {
                if ($(this).hasClass("btn-outline-dark")) 
                {
                    let dataItem={
                        "codProdotto" : $("#codProdotto_"+arr[1]).val(),
                        "descrizione": $("#descrizione_"+arr[1]).val().toUpperCase(),
                        "prezzo" : parseFloat($("#prezzo_"+arr[1]).val()),
                        "immagine" : $("#immagine_"+arr[1]).val()
                    };
                    $.post("/modifyItem", dataItem)
                        .done(function(data)
                        {
                            $("#delete_"+arr[1]).html("<i class=\"bi bi-trash\"></i>Delete");
                            $("#modify_"+arr[1]).html("<i class=\"bi bi-pencil-square\"></i>Edit");
                            $("#prezzo_"+arr[1]).attr("readonly", true);
                            $("#descrizione_"+arr[1]).attr("readonly", true);
                            $("#immagine_"+arr[1]).attr("readonly", true);
                        });
                }
                else
                {
                    if ($(this).hasClass("btn-outline-danger")) {
                        alert("può funzionare");
                        $.post("/deleteItem", {"codProdotto":$("#codProdotto_"+arr[1]).val()})
                            .done(function(data) {
                                $("#accordionProduct_"+arr[1]).remove();
                            });
                    }
                }
            }  
        }
    });



    //delete an item//
    $(document).on("click",".delete",function(){
        //alert("qui arriva la cancellazione");
        let _id=$(this).attr("id");
        let arr = _id.split("_");
        if ($(this).html() == "<i class=\"bi bi-trash\"></i>Delete")
        {
            $("#modify_"+arr[1]).html("<i class=\"bi bi-check-lg\"></i>").removeClass("btn-outline-dark").addClass("btn-outline-danger");
            $(this).html("<i class=\"bi bi-x-lg\"></i>").removeClass("btn-outline-dark").addClass("btn-outline-secondary");
        }
        else{
            if ("<i class=\"bi bi-x-lg\"></i>") {
                if ($(this).hasClass("btn-outline-dark")) {
                    $("#delete_"+arr[1]).html("<i class=\"bi bi-trash\"></i>Delete");
                    $("#modify_"+arr[1]).html("<i class=\"bi bi-pencil-square\"></i>Edit");
                    $("#prezzo_"+arr[1]).attr("readonly", true);
                    $("#descrizione_"+arr[1]).attr("readonly", true);
                    $("#immagine_"+arr[1]).attr("readonly", true);;
                }
                else{
                    if ($(this).hasClass("btn-outline-secondary")) {
                        $("#delete_"+arr[1]).html("<i class=\"bi bi-trash\"></i>Delete").removeClass("btn-outline-secondary").addClass("btn-outline-dark");
                        $("#modify_"+arr[1]).html("<i class=\"bi bi-pencil-square\"></i>Edit").removeClass("btn-outline-danger").addClass("btn-outline-dark");
                    }
                }
            }
        }
    });



});