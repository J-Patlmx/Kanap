
// const articleData = JSON.parse(localStorage.getItem("produit"))
let produit = "";
//associer la page aux données de l'api
let item = 0
let str = window.location.href
let url = new URL(str)
const id = url.searchParams.get("id"); //<-



fetch("http://localhost:3000/api/products" + id)// recuperation de l'api et stockage dans sessionStorage
    .then((res) => res.json())//des promesses
    .then((data) => {//toujours des promesses
        produit = data;

        document.querySelector('.item__img')
            .insertAdjacentHTML('afterbegin', `<img src="${produit.imageUrl}" alt="${produit.altTxt}"></img>`)
        document.getElementById('title')
            .insertAdjacentHTML('afterbegin', `${produit.name}`)
        document.getElementById('price')
            .insertAdjacentHTML('afterbegin', `${produit.price}`)
        document.getElementById('description')
            .insertAdjacentHTML('afterbegin', `${produit.description}`)
    })
// .catch(function (_err) {
//     alert(' system failed');
// })

// boucle permettant dafficher le choix des couleurs
let colorsChoice = 0;
for (let _color of produit[_id].colors) {
    document.getElementById('colors')
        .insertAdjacentHTML('afterbegin', `<option value=${articleData[item].colors[colorsChoice]}>${articleData[item].colors[colorsChoice]}</option>`);
    colorsChoice++
}



// fonction d'envoie au local storage
const addLocalStorage = function (panier) {
    localStorage.setItem('panier', JSON.stringify(panier));
};
//fonction d'ajout au panier
const addToCart = () => {
    let quantity = parseInt(document.getElementById('quantity').value);
    let color = colorsOption.options[colorsOption.selectedIndex].value;

    let newPurchase = {
        "_id": produit,
        "quantity": quantity,
        "color": color,
    }
}

//recupere mon panier memorise
let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];

// boucle for qui parcours les ligne de mon panier
let existingProduct = false;

for (let i = 0; i < panier.length; i++) {
    //si le produit exitse deja 
    if (panier[i]._id === newPurchase._id && panier[i].colors === newPurchase.colors) {
        existingProduct = i;
    };
    if (existingProduct !== false) {
        panier[existingProduct].quantity = parseInt(panier[existingProduct].quantity) + newPurchase.quantity;
    } else {
        panier.push(newPurchase);
    }
}
addLocalStorage(panier);
location.replace("front/html/cart.html");


// document.getElementById("addToCart").addEventListener("click", addToCart);

// function newPurchase() {
//     let panier = localStorage.getItem("panier");
//     if (panier == null) {
//         return [];
//     } else {
//         return JSON.parse(panier);
//     }
// }

//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------



// recherche du tableau en fonction de l'id de l'article via une boucle RETIRER CETTE BOUCLE
// while (id != (articleData[item]._id)) {
//     item++;
//     var pageID = item;//la porte de la variable est uniquement dispo dans ma boucle
// };

// ajout des elements html
// document.querySelector('.item__img')
//     .insertAdjacentHTML('afterbegin', `<img src="${articleData[item].imageUrl}" alt="${articleData[item].altTxt}"></img>`)
// document.getElementById('title')
//     .insertAdjacentHTML('afterbegin', `${articleData[item].name}`)
// document.getElementById('price')
//     .insertAdjacentHTML('afterbegin', `${articleData[item].price}`)
// document.getElementById('description')
//     .insertAdjacentHTML('afterbegin', `${articleData[item].description}`)



// function saveBasket(item) {
//     localStorage.setItem("basket", JSON.stringify(item));
// }

// function getNewPurchase() {
//     let basket = localStorage.getItem("basket");
//     if (basket == null) {
//         return [];
//     } else {
//         return JSON.parse(basket);
//     }
// }




// }

// function addToCart() {
//     console.log(newPurchase);
// }
// condition ternaire