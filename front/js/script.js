let items = document.querySelector('#items')

fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => {
        let display = ''
        for (let article of data) {
            display += `
                <a href="./product.html?id=${article._id}">
                <article>
                <img src="${article.imageUrl}" alt="${article.altTxt}">
                <h3 class="productName">${article.name}</h3>
                <p class="productDescription">${article.description}</p>
                </article>
                </a>
                `
        }
        items.innerHTML = display

    })
