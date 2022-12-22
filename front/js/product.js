
let product = "";
//associer la page aux données de l'api
let item = 0
let str = window.location.href
let url = new URL(str)
const idProduct = url.searchParams.get("id"); //<- va chercher dans mon url la valeur du parametre id

const colorsOption = document.getElementById('colors');

fetch("http://localhost:3000/api/products/" + idProduct)// recuperation de l'api et stockage dans localStorage
    .then((res) => res.json())//des promesses
    .then((data) => {//toujours des promesses

        product = data;
        // je recherche ce que je veux remplacer puis j'insere mon elemement de remplacement
        //apres le debut de ma balise
        document.querySelector('.item__img')
            .insertAdjacentHTML('afterbegin', `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`)
        document.getElementById('title')
            .insertAdjacentHTML('afterbegin', `${product.name}`)
        document.getElementById('price')
            .insertAdjacentHTML('afterbegin', `${product.price}`)
        document.getElementById('description')
            .insertAdjacentHTML('afterbegin', `${product.description}`)

        // boucle permettant dafficher le choix des couleurs
        // let colorsChoice = 0;
        for (let _color of product.colors) {
            document.getElementById('colors')
                .insertAdjacentHTML('beforeend', `<option value=${_color}>${_color}</option>`);
            // colorsChoice++
        }
    }
        // }
    )
    .catch(function (_err) {
        alert(' system failed');
    })


//fonction d'ajout au panier
const addToCart = () => {
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

        //recupere mon panier memorise
        let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];

        // boucle for qui parcours les ligne de mon panier
        let existingProduct = false;

        for (let i = 0; i < panier.length; i++) {
            //si le produit exitse deja 
            if (panier[i]._id === newPurchase._id && panier[i].color === newPurchase.color) {
                existingProduct = i;
            };
        }
        if (existingProduct !== false) {
            panier[existingProduct].quantity = parseInt(panier[existingProduct].quantity) + newPurchase.quantity;
        } else {
            panier.push(newPurchase);
        }
        // addLocalStorage(panier);
        localStorage.setItem('panier', JSON.stringify(panier));
        location.replace("cart.html");
    }
}

document.getElementById("addToCart").addEventListener("click", addToCart);


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
