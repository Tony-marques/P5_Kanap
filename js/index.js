(async () => {
  const products = await getProducts();
  console.log(products);
  displayProducts(products);
})();

const result = document.querySelector("#items");

// Récupérer les produits de l'API
//
async function getProducts() {
  // const response = await fetch("http://localhost:3000/api/products");
  const response = await fetch(
    "https://p5-kanap-ocr.herokuapp.com/api/products"
  );
  const body = await response.json();
  return body;
}

// Afficher les produits
function displayProducts(products) {
  const product = products
    .map((product) => {
      return `
    <a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.description}">
      <h3 class="${product.name}">${product.name}</h3>
      <p class="${product.description}">${product.description}</p>
    </article>
  </a>
    `;
    })
    .join("");
  result.innerHTML = product;
}
