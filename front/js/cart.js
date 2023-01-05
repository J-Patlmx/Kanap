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


let panierTotalPrice = 0;// initialisation du total panier a 0
let panierTotalQuantity = 0;// initialisation du total panier a 0

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

const reloadPanier = () => {
    cart__items.innerHTML = "";
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
                                    <input type="number" data-id="${i}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${Kanap.quantity}">
                                    <p>&nbsp; = Total : ${Apikanap.price * Kanap.quantity} €</p>
                                </div>
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem">Supprimer</p>
                                </div>
                                </div>
                            </div>
                            </article>
                            `
            // appl function total price
            priceTotalPanier(Apikanap.price, Kanap.quantity);
            //ajout de l'id produit 
            addIdPanier.push(Kanap._id)

            //ajout de l event supprimer sur les boutton
            document.querySelectorAll(".deleteItem").forEach(deleteBtn => {
                deleteBtn.addEventListener("click", () => deleteKanap(i))
            });

            //ajout de l event d'update de la quantitées
            document.querySelectorAll(".itemQuantity").forEach(modifiedBtn =>
                modifiedBtn.addEventListener('change', () => updateKanap(i, modifiedBtn.value)))
        })
    })

}


reloadPanier();



//FONCTION SUPPRIMER
function deleteKanap(p) {
    if (confirm("Êtes-vous sur de vouloirs supprimés cet article ? C'est définitif !")) {
        panier.forEach((_kanap, i) => {
            if (i === p) {
                panier.splice(i, 1);
                localStorage.setItem('panier', JSON.stringify(panier));
                location.reload();
            }
        })
    }
}

//FONCTION MODIFICATION QUANTITÉES
function updateKanap(p, value) {

    if (value < 1 || value > 100) {
        alert("Veuillez sélectionner une quantité entre 1 et 100 s'il vous plaît.")
    }
    panier.forEach((i) => {
        if (i === p) {
            panier[i].quantity = value;
            localStorage.setItem('panier', JSON.stringify(panier));
            reloadPanier(); //<-- remplace le location.reload() 
            // location.reload(); //<- me permet de mettre a jour mon panier dans le local storage
        }
    })
}

//FONCTION TOTAL PANIER ET TOTAL QUANTITÉS
function priceTotalPanier(price, quantity) {
    panierTotalPrice += quantity * price;
    panierTotalQuantity += quantity;

    //affiche prix total du panier
    let totalPrice = document.getElementById('totalPrice').textContent = panierTotalPrice;
    let totalQuantity = document.getElementById('totalQuantity').textContent = panierTotalQuantity;

    // envoie au local storage
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));

}




// let validForm = document.getElementById('cart__order__form');



/*
function verifForm() {

    if (($("#firstname").val() == "") && ($("#lastname").val() !== "")) {
        //on affiche un message pour demander à remplir le prenom
        alert("Veuillez remplir votre prénom !");

        //si le champs nom est vide et le champs prenom est rempli
    } else if (($("#lastname").val() == "") && ($("#firstname").val() !== "")) {
        //on affiche un message pour demander à remplir le prenom
        alert("Veuillez remplir votre nom !");

        //si les deux champs sont vides
    } else if (($("#lastname").val() == "") && ($("#firstname").val() == "")) {
        //on affiche un message pour demander à remplir les champs requis
        alert("Veuillez remplir les champs requis !");


    }

}*/


// document.getElementById("order").addEventListener("click", verifForm);
// window.location('index.html')

