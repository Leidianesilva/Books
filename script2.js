console.log("hello world");

function pesquisar(paramPesquisa){
    $.get("https://www.googleapis.com/books/v1/volumes?q="+encodeURI(paramPesquisa)).done(function(data){      //json is inside the "data" (server's reply)
    console.log(data);
    }).fail (function(data){
    console.log("Error :" +data);
    });
};

$("#executa_pesquisa").click(function(){
    var paramPesquisa = $("#pesquisa").val();     // "val"is used like it was html
    pesquisar(paramPesquisa);
});


