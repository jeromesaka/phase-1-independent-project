

const base_url = `https://jeromesaka.github.io/phase-1-independent-project/data.json`
//const base_url = `http://localhost:3000/books`
//on load show login page
function on_load(){
document.getElementById("register").style.display = "none";
document.getElementById("auth").style.display = "none";
document.getElementById("login").style.display = "block";
}

on_load();
let books = {};

function login(){

document.getElementById("register").style.display = "none";
document.getElementById("login").style.display = "none";
document.getElementById("auth").style.display = "block";
show_all_books_page()
}


function generateIterateBookHtml(books){
    let html = "";
    for (let i=0;i<books.length;i++){
        html += "<li class='book_item'><div><p>Name: "+books[i].name+"</p><p>Serial Number: "+books[i].serial_number+"</p><p>Author: "+books[i].author+"</p><p>Description: "+books[i].description+"</p><p>Is favourite: "+(books[i].is_favourite?'Yes':'No')+"</p><p><button type='button' onclick='add_to_favourite("+books[i].id+","+!books[i].is_favourite+")'>"+(books[i].is_favourite?"Remove from favourite":"Add to favourite")+"</button></p></div></li>"
    }

    return html;
}
function load_all_books(){
fetch(base_url)
    .then(res=>res.json())
    .then(res=> {

        document.getElementById("all_books_div").innerHTML = generateIterateBookHtml(res['books'])

    })
    .catch(e=>console.error(e))
}
function load_searched_books(){
fetch(base_url+"?q="+document.getElementById('search_term').value)
    .then(res=>res.json())
    .then(res=> {

        document.getElementById("all_books_div").innerHTML = generateIterateBookHtml(res)

    })
    .catch(e=>console.error(e))
}

function load_favourite_books(){
fetch(base_url)
    .then(res=>res.json())
    .then(res=> {

        const books_ = res['books'].filter((book)=>{
            return book.is_favourite;
        })


        document.getElementById("favourite_div").innerHTML = generateIterateBookHtml(books_)

    })
    .catch(e=>console.error(e))
}



function show_all_books_page(){
document.getElementById("all_books_div__").style.display = "block";
document.getElementById("favourite_div").style.display = "none";
document.getElementById("create_div").style.display = "none";
load_all_books();
}
function search_books(){
document.getElementById("all_books_div__").style.display = "block";
document.getElementById("favourite_div").style.display = "none";
document.getElementById("create_div").style.display = "none";
load_searched_books();
}

function show_favourite_books(){

document.getElementById("all_books_div__").style.display = "none";
document.getElementById("favourite_div").style.display = "block";
document.getElementById("create_div").style.display = "none";
load_favourite_books();
}

function show_create(){

document.getElementById("all_books_div__").style.display = "none";
document.getElementById("favourite_div").style.display = "none";
document.getElementById("create_div").style.display = "block";
}

function add_to_favourite(id,is_favourite){

    fetch(base_url+"/"+id,{
        method:"PATCH",
        body:JSON.stringify({
            is_favourite
        }),
        headers:{
            'Content-Type' : 'application/json'
        }
    })
        .then(res=>res.json())
        .then(res=>{
            show_all_books_page()
        })
        .catch(e=>console.error(e))
}

function add_book(){


fetch(base_url,{
    method:"POST",
    body:JSON.stringify({
        "id" : books.length+1,
        "name" : document.getElementById("name").value,
        "serial_number" : document.getElementById("author").value,
        "author" : document.getElementById("serial_number").value,
        "description" : document.getElementById("description").value,
        "is_favourite" : false,
    }),
    headers:{
        'Content-Type' : 'application/json'
    }
})
    .then(res=>res.json())
    .then(res=> {
        show_all_books_page()
    })
    .catch(e=>console.error(e))
}

document.getElementById("form-signin").addEventListener("click",function (e){

e.preventDefault()
login()
})

document.getElementById("all_books").addEventListener("click",function (e){

show_all_books_page()
})

document.getElementById("favourite").addEventListener("click",function (e){

show_favourite_books()
})
document.getElementById("create").addEventListener("click",function (e){

show_create()
})
document.getElementById("add_book_form").addEventListener("submit",function (e){

e.preventDefault();
add_book()

})
document.getElementById("search_form").addEventListener("submit",function (e){

e.preventDefault();
search_books()

})