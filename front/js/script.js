// let item = 0; //declaration de variable et initialisation de la valeur

// debut de la fonction quand le DOM est pret
const start = () => {
    fetch("http://localhost:3000/api/products")// recuperation de l'api et stockage dans sessionStorage
        .then((res) => res.json())//des promesses
        .then((data) => {//toujours des promesses
            sessionStorage.setItem("productData", JSON.stringify(data))
            // const articleData = JSON.parse(sessionStorage.getItem("productData"))
            const galery = document.getElementById('items')
            for (let _element of data) {
                // document.getElementById('items') // recuperation de mon element par son id
                galery.insertAdjacentHTML('beforeend',//insertion juste à l'intérieur de l'element
                    `<a href="./product.html?=${_element._id}">
                            <article>
                                <img src="${_element.imageUrl}" 
                                alt="${_element.altTxt}">
                                <h3 class="productName">${_element.name}</h3>
                                <p class="productDescription">${_element.description}</p>
                            </article>
                        </a>`)
                // item++ //incrementation
            }
        })
}

addEventListener('load', start)
