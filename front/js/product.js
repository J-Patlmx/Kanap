
const articleData = JSON.parse(sessionStorage.getItem("productData"))

//associer la page aux données de l'api
let item = 0
let str = window.location.href
let url = new URL(str)
let id = url.searchParams.toString()

// recherche du tableau en fonction de l'id de l'article via une boucle 
while (id != (articleData[item]._id + '=')) {
    item++;
    var pageID = item;//la porte de la variable est uniquement dispo dans ma boucle
};

// ajout des elements html
document.querySelector('.item__img')
    .insertAdjacentHTML('afterbegin', `<img src="${articleData[item].imageUrl}" alt="${articleData[item].altTxt}"></img>`)
document.getElementById('title')
    .insertAdjacentHTML('afterbegin', `${articleData[item].name}`)
document.getElementById('price')
    .insertAdjacentHTML('afterbegin', `${articleData[item].price}`)
document.getElementById('description')
    .insertAdjacentHTML('afterbegin', `${articleData[item].description}`)

// boucle permettant dafficher le choix des couleurs    
let colorsChoice = 0
for (let _color of articleData[item].colors) {
    document.getElementById('colors')
        .insertAdjacentHTML('afterbegin', `<option value=${articleData[item].colors[colorsChoice]}>${articleData[item].colors[colorsChoice]}</option>`);
    colorsChoice++
}



document.getElementById("addToCart").addEventListener("click", addToCart)

function addToCart() {
    // document.getElementById("").innerHTML = alert("ne lache pas meme si ça t'enerve")

}


function isValid(value) {
    console.log('testici')
}
