//Fonction pour afficher l'ID de commande sur la page de confirmation
function displayOrderId() {

    try {
        // Récupère l'ID de commande à partir de l'URL
        let url = new URL(location.href)
        const orderId = url.searchParams.get("orderId");
        // Récupère la balise span avec l'identifiant "orderId"
        const orderIdEl = document.getElementById("orderId")
        // Affiche le numéro de commande dans la balise span
        orderIdEl.innerHTML = orderId;
    } catch (error) {
        // Si une erreur se produit lors de l'exécution de la fonction, la clause catch est déclenchée et affiche un message d'erreur dans la console, indiquant le numéro de l'erreur et sa description.
        console.log('Erreur Confirmation 01');
    }
}
// Appel de la fonction pour afficher l'ID de commande
displayOrderId();


// Génère un numéro de commande unique aléatoire
    // const orderId = "CMD" + Math.floor(10000000000 + Math.random() * 900000000);