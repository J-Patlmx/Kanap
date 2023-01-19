
//Déclaration de la fonction start
const start = () => {
    //fetch pour récupérer les données de l'API
    fetch("http://localhost:3000/api/products")
        //promesse pour transformer la réponse en format json
        .then((res) => res.json())//des promesses
        //autre promesse pour utiliser les données récupérées
        .then((data) => {
            //stockage des données dans le localStorage pour une utilisation ultérieure
            localStorage.setItem("productData", JSON.stringify(data))
            //récupération de l'élément où les produits seront affichés
            const galery = document.getElementById('items')
            //boucle pour parcourir les produits récupérés
            for (let element of data) {
                //insertion des produits dans la galerie en utilisant insertAdjacentHTML pour ajouter le contenu HTML juste à l'intérieur de l'élément cible
                galery.insertAdjacentHTML('beforeend',//insertion juste à l'intérieur de l'element
                    `<a href="./product.html?id=${element._id}">
                            <article>
                                <img src="${element.imageUrl}" 
                                alt="${element.altTxt}">
                                <h3 class="productName">${element.name}</h3>
                                <p class="productDescription">${element.description}</p>
                            </article>
                        </a>`)
            }
        })
    // .catch(function (_err) {
    //     alert('deso pas deso');
    //     console.log('erreur back');
    // })
}

addEventListener('load', start)
