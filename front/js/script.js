
// debut de la fonction quand le DOM est pret
const start = () => {
    fetch("http://localhost:3000/api/products")// recuperation de l'api et stockage dans sessionStorage
        .then((res) => res.json())//des promesses
        .then((data) => {//toujours des promesses
            localStorage.setItem("productData", JSON.stringify(data))

            const galery = document.getElementById('items')
            for (let element of data) {

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
}

addEventListener('load', start)
