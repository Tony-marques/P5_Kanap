const orderId = document.querySelector("#orderId");
const orderIdLS = localStorage.getItem("orderId");
orderId.innerHTML = orderIdLS;

// Récupérer l'id par l'url
