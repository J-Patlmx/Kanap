
function displayOrderId() {
    // Génère un numéro de commande unique aléatoire
    const orderId = "CMD" + Math.floor(10000000000 + Math.random() * 900000000);

    // Récupère la balise span avec l'identifiant "orderId"
    const orderIdEl = document.getElementById("orderId");

    // Affiche le numéro de commande dans la balise span
    orderIdEl.innerHTML = orderId;

}

displayOrderId();