/*
//LOGIQUE
   recuperer panier Local storage
    boucle sur le panier (_id)
        completr les info pour chaque produit du panier 
        a partir du back via fetch("http:  localhost://3000/api/products/" + idProduct) 
        
        afficher notre produit selon template article
    // fonction calcul prix du total panier 
        debut boucle  var total =0
        //actions lier a des click 
                removeItem +ecrasement panier +reload LS
                update item +ecrasement panier +reload Ls
fin de la boucle 
//traitement formaulaire  pour lenvoie d el acommande
*/
//recupere mon panier memorise
let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];
let cart__items = document.getElementById("cart__items");

let prixPanier = 0;// initialisation du total panier a 0
let addIdPanier = [];// recuperation id du produit

//Fonction pour recuperer les donnees du produit via l'api
function GetProduct(Currentid) {
    return Promise.resolve(
        fetch("http://localhost:3000/api/products/" + Currentid)// recuperation de l'api et stockage dans localStorage
            .then(response => response.json())
            .then(function (product) {
                return product
            })
    );
}

function priceTotalPanier(price, quantity) {
    panierTotalPrice += quantity * price;
    //affiche prix total du panier
    let totalPrice = document.getElementById('totalPrice').textContent = panierTotalPrice;
    // envoie au local storage
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
}

//Boucle sur le panier
panier.forEach((Kanap, i) => {
    GetProduct(Kanap._id).then(Apikanap => {
        cart__items.innerHTML += `
        <article class="cart__item" data-id="${Kanap._id}" data-color="${Kanap.color}">
                        <div class="cart__item__img">
                            <img src="${Apikanap.imageUrl}" alt="${Apikanap.altTxt}">
                        </div>
                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                            <h2>${Apikanap.name}</h2>
                            <p>Couleur : ${Kanap.color}</p>
                            <p>Prix : ${Apikanap.price} €</p>
                            </div>
                            <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté :</p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${Kanap.quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                            </div>
                        </div>
                        </article>
                        `
    })

});


// appl function total price
// priceTotalPanier(Apikanap.price, Kanap.quantity);
// addIdPanier.push(Kanap._id);

//fonction Supprimer
// document.querySelectorAll(".deleteItem").forEach(delBtn => {
//     delBtn.addEventListener("click", () => deletecanap(delBtn.closest('.cart__item').dataset.id))
// });

// function deletecanap(id) {
//     panier.forEach((Kanap, i) => {
//         if (Kanap._id === id) {
//             panier.splice(i, 1);
//             localStorage.setItem('panier', JSON.stringify(panier));
//             window.location.reload();
//         }
//     })
// }

    //;


// if (panier == localStorage) {
//         alert('bad bad ');
// } else {
//         alert('gogogogogogogog');
// }



// const order = () => {

// ici je doit cree toute les conditions et verification pour permette la validation de mon achat
//si le panier et different de vide et que tout les inputs sont rempli correctement alors je peux passer mon ordre de commande
//sinon ("merci de choisir un canape location.replace('index.html')
//sinon ("merci de verifier l'imput ('')

// }
//localStorage.removeItem('panier')// pour supprimer un kanap
// addLocalStorage(panier);
// localStorage.setItem('panier', JSON.stringify(panier));
// location.replace("index.html");


// document.getElementById("order").addEventListener("click", order);

