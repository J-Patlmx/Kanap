let item = 0; //declaration de variable et initialisation de la valeur

// debut de la fonction quand le DOM est pret
const start = () => {
    fetch("http://localhost:3000/api/products")// recuperation de l'api et stockage dans sessionStorage
        .then((res) => res.json())//des promesses
        .then((data) => {//toujours des promesses
            sessionStorage.setItem("productData", JSON.stringify(data))
            const articleData = JSON.parse(sessionStorage.getItem("productData"))
            for (let _element of articleData) {
                document.getElementById('items') // recuperation de mon element par son id
                    .insertAdjacentHTML('beforeend',//insertion juste à l'intérieur de l'element
                        `<a href="./product.html?${articleData[item]._id}">
                            <article>
                                <img src="${articleData[item].imageUrl}" 
                                alt="${articleData[item].altTxt}">
                                <h3 class="productName">${articleData[item].name}</h3>
                                <p class="productDescription">${articleData[item].description}</p>
                            </article>
                        </a>`)
                item++ //incrementation
            }
        })
}

addEventListener('load', start)
