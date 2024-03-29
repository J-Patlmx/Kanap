// Initialisation de la variable panier à partir de Local storage
// s'il n'existe pas de panier dans le local storage on initialise un tableau vide
let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];

// récupération de la div par son id dans laquelle on va ajouter les articles du panier
let cart__items = document.getElementById("cart__items");

let panierTotalPrice = 0;// initialisation du total panier a 0
let panierTotalQuantity = 0;// initialisation du total panier a 0
let addIdPanier = [];// recuperation id du produit

//Fonction pour recuperer les donnees du produit via l'api
function GetProduct(Currentid) {
    try {
        //utilisation de promise pour gérer les async requests
        return Promise.resolve(
            fetch("http://localhost:3000/api/products/" + Currentid)// recuperation de l'api et stockage dans localStorage
                .then(response => response.json())
                .then(function (product) {
                    return product
                })
        );
    } catch (error) {
        // Si une erreur se produit lors de l'exécution de la fonction, la clause catch est déclenchée et affiche un message d'erreur dans la console, indiquant le numéro de l'erreur et sa description.
        console.log('Erreur cart 01:', error);
    }
}

const reloadPanier = () => {
    try {
        panierTotalPrice = 0;// initialisation du total panier a 0
        panierTotalQuantity = 0;
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
                // appel function total price
                priceTotalPanier(Apikanap.price, Kanap.quantity);
                //ajout de l'id produit 
                addIdPanier.push(Kanap._id)

                //ajout de l'event supprimer sur les boutton
                document.querySelectorAll(".deleteItem").forEach((deleteBtn, i) => {
                    deleteBtn.addEventListener("click", () => deleteKanap(i))
                });

                //ajout de l'event d'update de la quantitées
                document.querySelectorAll(".itemQuantity").forEach(modifiedBtn =>
                    modifiedBtn.addEventListener('change', () => updateKanap(i, modifiedBtn.value)))
            })
        })
    }
    catch (error) {
        // Si une erreur se produit lors de l'exécution de la fonction, la clause catch est déclenchée et affiche un message d'erreur dans la console, indiquant le numéro de l'erreur et sa description.
        console.log("Erreur cart 02:", error);
    }
}

reloadPanier();

//FONCTION SUPPRIMER
function deleteKanap(p) {
    try {// si le user est sûre de del sont Kanap alors je vais chercher la position de celu si dans le panier  
        if (confirm("Êtes-vous sur de vouloirs supprimés cet article ? C'est définitif !")) {
            panier.forEach((_kanap, i) => {
                if (i === p) {//Si l'indice i === à la position p l'article Kanap le user souhaite supprimer,
                    panier.splice(i, 1);//la fonction deleteKanap utilise la méthode splice() pour supprimer l'article Kanap à l'indice i du panier.
                    localStorage.setItem('panier', JSON.stringify(panier));//utilisation de setItem() pour mettre à jour le panier  dans le stockage local avec la nouvelle version du panier.
                    // Enfin, la fonction recharge la page à l'aide de la méthode reload() de l'objet location pour afficher la nouvelle version du panier mise à jour dans la page.
                    location.reload();
                }
            })
        }
    } catch (error) {
        // Si une erreur se produit lors de l'exécution de la fonction, la clause catch est déclenchée et affiche un message d'erreur dans la console, indiquant le numéro de l'erreur et sa description.
        console.log("Erreur cart 03 :" + error);
    }
}

//FONCTION MODIFICATION QUANTITÉES
function updateKanap(p, value) {
    try {
        if (value < 1 || value > 100) {
            alert("Veuillez sélectionner une quantité entre 1 et 100 s'il vous plaît.");
        }
        panier.forEach((kanap, i) => {
            if (i === p) {//Si l'indice i === position p de l'article Kanap que le user veux mettre à jour, 
                kanap.quantity = value;//la fonction met à jour la propriété "quantity" de l'article Kanap avec la nouvelle quantité passée en argument.
                localStorage.setItem('panier', JSON.stringify(panier));//utilisation de setItem() pour mettre à jour le panier  dans le stockage local avec la nouvelle version du panier.

                reloadPanier();//<-- remplace le location.reload() 
                // location.reload(); //<- me permet de mettre a jour mon panier dans le local storage
            }
        })
    } catch (error) {
        // Si une erreur se produit lors de l'exécution de la fonction, la clause catch est déclenchée et affiche un message d'erreur dans la console, indiquant le numéro de l'erreur et sa description.
        console.log("erreur cart 04:", error);
    }
}
//FONCTION TOTAL PANIER ET TOTAL QUANTITÉS
function priceTotalPanier(price, quantity) {
    try {
        panierTotalPrice += quantity * price;
        panierTotalQuantity += parseInt(quantity);

        //affiche prix total du panier
        let totalPrice = document.getElementById('totalPrice').textContent = panierTotalPrice;
        let totalQuantity = document.getElementById('totalQuantity').textContent = panierTotalQuantity;

        // envoie au local storage
        // localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
        localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
    } catch (error) {
        // Si une erreur se produit lors de l'exécution de la fonction, la clause catch est déclenchée et affiche un message d'erreur dans la console, indiquant le numéro de l'erreur et sa description.
        console.log("Erreur Cart 05:", error);
    }

}

// Fonction pour vider le panier
const clearCart = () => {
    try {
        //Réinitialisation de la variable panier à un tableau vide
        panier = [];
        //Mise à jour du Local storage en enregistrant la nouvelle valeur de la variable panier
        localStorage.setItem('panier', JSON.stringify(panier));
        // Suppression des articles du panier dans la div cart__items
        cart__items.innerHTML = "";
    } catch (error) {
        // Si une erreur se produit lors de l'exécution de la fonction, la clause catch est déclenchée et affiche un message d'erreur dans la console, indiquant le numéro de l'erreur et sa description.
        console.log("Erreur Cart 06:", error);
    }
}

let form = document.querySelector(".cart__order__form");
// Ecouteur d'événement "click" pour le formulaire de commande
form.addEventListener("click", function (event) {
    try {
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
            // Création d'un objet "contact" avec les données saisies
            const contact = {
                'firstName': firstName,
                'lastName': lastName,
                'address': address,
                'city': city,
                'email': email
            };

            //Création d'un tableau vide "products"
            let products = [];

            //Ajout des identifiants des produits du panier au tableau "products"
            panier.forEach((kanap) => {
                products.push(kanap._id)
            })
            //Transformation de l'objet "FormCommande" en format JSON
            let FormCommande = JSON.stringify({
                contact,
                products,
            });

            // Appel de l'API avec Fetch et envoi des données avec la méthode POST
            fetch('http://localhost:3000/api/products/order', {
                method: 'POST',
                headers: {
                    'content-type': "application/json"
                },
                mode: "cors",
                body: FormCommande
            })
                .then(function (response) {
                    return response.json()
                })
                .then(function (rep) {
                    console.log(rep)
                    //Sauvegarde des données de contact et de commande dans le stockage local
                    // localStorage.setItem("contact", JSON.stringify(rep.contact));
                    localStorage.setItem("produits", JSON.stringify(rep.products));

                    // Appel de la fonction pour vider le panier
                    // clearCart();

                    // Redirection vers la page de confirmation
                    window.location.assign("./confirmation.html?orderId=" + rep.orderId);


                })
                .catch(function (_err) {
                    alert(' fetch erreur');
                })


        }
    } catch (error) {
        // Si une erreur se produit lors de l'exécution de la fonction, la clause catch est déclenchée et affiche un message d'erreur dans la console, indiquant le numéro de l'erreur et sa description.
        console.log("Erreur Cart 07:", error);
    }
});
