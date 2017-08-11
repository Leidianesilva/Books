function Library() {     //Class Library
    //this is the constructor
    this.books = new Queue()
    this.booksViewed = new Queue();
    this.actualBook;

    this.addBook = function (book) {
        this.books.enqueue(book)
    };

    this.nextBook = function () {
        this.actualBook = this.books.dequeue();
        if (this.actualBook === undefined)
            return false;

        this.booksViewed.enqueue(this.actualBook);
        this.actualBook.render();
        return true;
    }
    this.addLike = function () {
        this.actualBook.likes++;

    }
    this.addDislike = function () {
        this.actualBook.dislikes++;

    }
    //      this.counterLikes = function () {
    //         var sim = 0;
    //         for (var i = 0; i < this.books.data.length; i++) {
    //             sim += this.books.data[i].likes;
    //         }
    //         return sim;
    //     }

    //     this.counterDislikes = function () {
    //         var nao = 0;
    //         for (var i = 0; i < this.books.length; i++) {
    //             nao += this.books[i].dislikes;
    //         }

    //         return nao;
    //     } 
};

function Queue() {
    this.data = []

    this.enqueue = function (element) {
        this.data.push(element);
    }

    this.dequeue = function () {
        var result = this.data[0];
        this.data.splice(0, 1);
        return result;
    };
};

function Book(img, title, descricao, link) {
    this.img = img;
    this.title = title;
    this.descricao = descricao;
    this.link = link;
    this.likes = 0;
    this.dislikes = 0;
    this.render = function () {
        $("#picture").attr("src", this.img);
        $("#titulo").html(this.title);
        $("#paragrafo").html(this.descricao);
        $("#website").attr("href", this.link);
    };
};

function init(paramPesquisa){  
    $.get("https://www.googleapis.com/books/v1/volumes?q=" + encodeURI(paramPesquisa)).done(function (data) {      //asyncrona json (server's reply) is inside the "data"
    
    //Method init will return immediately, this block is executed in parallel.     
    console.log(data.items[0].volumeInfo.title, data.items[0].volumeInfo.Description);

        for (var i = 0; i < data.items.length; i++) {
            var item = data.items[i];
            var book = new Book(item.volumeInfo.imageLinks.thumbnail,
                item.volumeInfo.title,
                item.volumeInfo.description, item.volumeInfo.previewLink);
            library.addBook(book);
            }

            $("#startPage").hide();
            $("#mainPage").show();
            library.nextBook(); 
        }).fail(function (data) {
            console.log("Error :" + data);
        });

};
    

$('#inicial').click(function(){
    var paramPesquisa = $("#idsearch").val();     // "val"is used like it was html
    init(paramPesquisa);
})

    //     this.counterDislikes = function () {
    //         var nao = 0;
    //         for (var i = 0; i < this.books.length; i++) {
    //             nao += this.books[i].dislikes;
    //         }

    //         return nao;


// var book1 = new Book("http://vignette1.wikia.nocookie.net/davincicode/images/0/0f/Da_Vinci_Code_poster.jpg/revision/latest?cb=20150623194856", "Da Vinci Code", "A murder in Paris' Louvre Museum and cryptic clues in some of Leonardo da Vinci's most famous paintings lead to the discovery of a religious mystery. For 2,000 years a secret society closely guards information that -- should it come to light -- could rock the very foundations of Christianity.", "http://www.penguinrandomhouse.com/books/19309/the-da-vinci-code-by-dan-brown/");
// var book2 = new Book("https://images-na.ssl-images-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UX182_CR0,0,182,268_AL_.jpg", "Lord of Rings", "The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work.", "http://www.ebay.com/bhp/lord-of-the-rings-books");
// var book3 = new Book("http://crossref-it.info/files/images/dubliners-james-joyce.jpg", "Dubliners", "Dubliners is a collection of fifteen short stories by James Joyce, first published in 1914. They form a naturalistic depiction of Irish middle class life in and around Dublin in the early years of the 20th century.", "http://www.ebay.com/bhp/james-joyce-dubliners");


// library.addBook(book1);
// library.addBook(book2);
// library.addBook(book3);


function ComputeAndDisplayStats() {
    var totalLikes = 0;
    var totalDislikes = 0;

    var book;
    //while we can dequeue books
    while ((book = library.booksViewed.dequeue()) !== undefined) { //dequeue booksViewed into book; If book is not undefined, run the loop.
        //counting total likes and total dislikes for all books
        totalLikes += book.likes;
        totalDislikes += book.dislikes;

        var html = "<tr>";
        html += "<td>";
        html += book.title;
        html += "</td>";
        html += "<td>";
        html += book.likes;
        html += "</td>";
        html += "<td>";
        html += book.dislikes;
        html += "</td>";
        html += "</tr>";
        $('#tbody').append(html);
    }

    $("#contador1").text(totalLikes);
    $("#contador2").text(totalDislikes);
}

// $('.primeiro').click(function () {
//     $("#startPage").hide();
//     $("#mainPage").show();
//     $("#primeiroTitulo").hide();
// });


$('#buttonLike').click(function() {
    library.addLike();
    if (library.nextBook() === false) {     //try to load next book, returns true if loaded successfully, returns false if no more books
        $('#mainPage').hide();
        $("#endPage").show();
        ComputeAndDisplayStats();
    }
});

$('#buttonDislike').click(function(){
    library.addDislike();
    if (library.nextBook() === false){     //try to load next book, returns true if loaded successfully, returns false if no more books
        $('#mainPage').hide();
        $("#endPage").show();
        ComputeAndDisplayStats();
    }
});

//***Executed at loading of webpage */
$("#mainPage").hide();
$("#endPage").hide();
var library = new Library();

