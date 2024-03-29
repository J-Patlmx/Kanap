let product = "";
// variable pour stocker les informations du produit à partir de l'API
let item = 0
let str = window.location.href
let url = new URL(str)
const idProduct = url.searchParams.get("id"); // Récupère la valeur de l'ID dans l'URL

const colorsOption = document.getElementById('colors');
// Récupération des informations du produit à partir de l'API
fetch("http://localhost:3000/api/products/" + idProduct)
    //Récupère les informations de l'API pour le produit spécifié par l'ID (recupère dans l'url )
    .then((res) => {//des promesses
        try {
            return res.json();
        }
        // Si une erreur se produit lors de l'exécution de la fonction, la clause catch est déclenchée et affiche un message d'erreur dans la console, indiquant le numéro de l'erreur et sa description.
        catch (error) { console.log('erreur product 01', error); }
    })// Transforme la réponse en format JSON
    .then((data) => {
        try {
            product = data;
            // Insertion des informations du produit dans les éléments correspondants de la page

            document.querySelector('.item__img')
                .insertAdjacentHTML('afterbegin', `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`)
            document.getElementById('title')
                .insertAdjacentHTML('afterbegin', `${product.name}`)
            document.getElementById('price')
                .insertAdjacentHTML('afterbegin', `${product.price}`)
            document.getElementById('description')
                .insertAdjacentHTML('afterbegin', `${product.description}`)

            // Boucle pour ajouter les options de couleur dans la liste déroulante
            for (let _color of product.colors) {
                document.getElementById('colors')
                    .insertAdjacentHTML('beforeend', `<option value=${_color}>${_color}</option>`);

            }
        } catch (error) {
            console.log('erreur product 02', error);
        }
    }
    )
    .catch(function (_err) {
        alert(' system failed');
    })


// Fonction pour ajouter le produit au panier
const addToCart = () => {
    try {

        let quantity = parseInt(document.getElementById('quantity').value);
        let color = colorsOption.options[colorsOption.selectedIndex].value;
        if (color === "") {
            alert('Veuillez selectioner une couleur svp !')
        } else if (quantity < 1 || quantity > 100) {
            alert('Veuillez selectioner une quantité comprise entre 1 et 100 svp !')

        } else {

            let newPurchase = {
                "_id": idProduct,
                "quantity": quantity,
                "color": color,
            }

            // Récupération du panier enregistré en local
            let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];

            // Boucle pour parcourir les lignes du panier
            let existingProduct = false;

            for (let i = 0; i < panier.length; i++) {
                // Si le produit existe déjà dans le panier
                if (panier[i]._id === newPurchase._id && panier[i].color === newPurchase.color) {
                    existingProduct = i;
                };
            }// si existingProduct existe alors on lui ajoute la nouvelle quantitèe
            if (existingProduct !== false) {
                panier[existingProduct].quantity = parseInt(panier[existingProduct].quantity) + newPurchase.quantity;
            } else {// sinon on lajoute dans un nouvelle achat
                panier.push(newPurchase);
            }
            // Ajout des informations du panier en local
            localStorage.setItem('panier', JSON.stringify(panier));
            // Redirection vers la page du panier
            location.replace("cart.html");
        }
    } catch (error) {
        // Si une erreur se produit lors de l'exécution de la fonction, la clause catch est déclenchée et affiche un message d'erreur dans la console, indiquant le numéro de l'erreur et sa description.
        console.log('erreur product 3', error);
    }
}
// Ajout de l'événement click pour le bouton "Ajouter au panier"
document.getElementById("addToCart").addEventListener("click", addToCart);

