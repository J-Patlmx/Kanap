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
//_-------------------------------------------------------------------------------------------------------------

// Initialisation de la variable panier à partir de Local storage
// s'il n'existe pas de panier dans le local storage on initialise un tableau vide
let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];

// récupération de la div dans laquelle on va ajouter les articles du panier
let cart__items = document.getElementById("cart__items");

let panierTotalPrice = 0;// initialisation du total panier a 0
let panierTotalQuantity = 0;// initialisation du total panier a 0
let addIdPanier = [];// recuperation id du produit

//Fonction pour recuperer les donnees du produit via l'api
function GetProduct(Currentid) {
    //utilisation de promise pour gérer les async requests
    return Promise.resolve(
        fetch("http://localhost:3000/api/products/" + Currentid)// recuperation de l'api et stockage dans localStorage
            .then(response => response.json())
            .then(function (product) {
                return product
            })
    );
}

const reloadPanier = () => {
    // On vide la div pour eviter de rajouter des éléments en doublon
    cart__items.innerHTML = "";
    //Boucle sur le panier
    panier.forEach((Kanap, i) => {
        GetProduct(Kanap._id).then(Apikanap => {
            // template avec les infos produits récupérées via l'API
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




let form = document.querySelector(".cart__order__form");

// Ecouteur d'événement "submit" pour le formulaire de commande
form.addEventListener("submit", function (event) {
    // Empêche la soumission automatique du formulaire
    event.preventDefault();
    // Récupère la valeur saisie pour chaque champ
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let address = document.querySelector("#address").value;
    let city = document.querySelector("#city").value;
    let email = document.querySelector("#email").value;

    // Récupère les éléments de message d'erreur correspondants à chaque champ
    let firstNameError = document.querySelector("#firstNameErrorMsg");
    let lastNameError = document.querySelector("#lastNameErrorMsg");
    let addressError = document.querySelector("#addressErrorMsg");
    let cityError = document.querySelector("#cityErrorMsg");
    let emailError = document.querySelector("#emailErrorMsg");

    let isValid = true;

    // Validation du champ "Prénom"
    if (!/^[a-zA-Z]+$/.test(firstName)) {
        firstNameError.textContent = "Entrer un prénom valide";
        isValid = false;
    } else {
        firstNameError.textContent = "";
    }

    // Validation du champ "Nom"

    if (!/^[a-zA-Z]+$/.test(lastName)) {
        lastNameError.textContent = "Entrer un nom valide";
        isValid = false;
    } else {
        lastNameError.textContent = "";
    }

    // Validation du champ "Adresse"

    if (!/^[a-zA-Z0-9\s,'-]*$/.test(address)) {
        addressError.textContent = "Entrer une adresse valide";
        isValid = false;
    } else {
        addressError.textContent = "";
    }

    // Validation du champ "Ville"

    if (!/^[a-zA-Z]+$/.test(city)) {
        cityError.textContent = "Entrer une ville valide";
        isValid = false;
    } else {
        cityError.textContent = "";
    }

    // Validation du champ "Email"

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        emailError.textContent = "Entrer un email valide";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    if (isValid) {
        form.submit();
    }
});





