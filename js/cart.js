let color = "";
let id = "";
let quantity = "";

// console.log(emailInput);

(async () => {
  const productLS = await getProductLS();
  displayProduct(productLS);
  totalPrice(productLS);
  totalQuantity(productLS);
  deleteItem(productLS);
  changeQuantity(productLS);
})();

function getProductLS() {
  return JSON.parse(localStorage.getItem("product"));
}

async function displayProduct(productLS) {
  const cartItem = document.querySelector("#cart__items");
  const productsDisplay = productLS
    .map((p) => {
      return `
        <article class="cart__item" data-id="${p.id}" data-color="${p.color}">
          <div class="cart__item__img">
            <img src="${p.imageUrl}" alt="Photographie d'un canapé">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2 class="name">${p.name}</h2>
                <p class="color">${p.color}</p>
                <p class="price">${p.price} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${p.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>
      `;
    })
    .join("");
  cartItem.innerHTML = productsDisplay;
}

// Récupérer le prix total de l'ensemble des produits du panier
function totalPrice(product) {
  let sum = [];
  for (let v of product) {
    sum.push(v.price * v.quantity);
  }
  const reduce = sum.reduce((acc, value) => {
    return acc + value;
  });

  const tPrice = document.querySelector("#totalPrice");
  tPrice.innerHTML = reduce;
}

// Récupérer la quantité total de produit
function totalQuantity(product) {
  let sum = [];
  for (let v of product) {
    sum.push(v.quantity);
  }
  const reduce = sum.reduce((acc, value) => {
    return acc + value;
  });

  const tQuantity = document.querySelector("#totalQuantity");
  tQuantity.innerHTML = reduce;
}

// Supprimer un élément du LS
function deleteItem() {
  const deleteButtons = document.querySelectorAll(".deleteItem");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const target = e.target.closest(".cart__item").dataset.id;
      const color = e.target.closest(".cart__item").dataset.color;

      let kanap = await getProductLS();
      kanap = kanap.filter((item) => {
        return item.id != target || item.color != color;
      });
      saveProductLS(kanap);
      location.reload();
    });
  });
}

// Sauvegarder dans le localStorage
function saveProductLS(product) {
  return localStorage.setItem("product", JSON.stringify(product));
}

// Change la quantité depuis la page panier
async function changeQuantity() {
  let kanap = await getProductLS();
  let inputQuantity = document.querySelectorAll(".itemQuantity");

  inputQuantity.forEach((item) => {
    item.addEventListener("input", (e) => {
      const target = e.target.closest(".cart__item").dataset.id;
      const color = e.target.closest(".cart__item").dataset.color;
      let kanapFind = kanap.find((item) => {
        return item.id == target && item.color == color;
      });
      kanapFind.quantity = parseInt(e.target.value);
      saveProductLS(kanap);
      // Actualise la quantité
      totalQuantity(kanap);
      // Actualise le prix total
      totalPrice(kanap);
    });
  });
  // }
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  confirmCart();
});

let regexEmail = new RegExp(
  "^[a-zA-Z0-9.-_]+@{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
  "g"
);
let regexFirstName = new RegExp("^([^0-9]*).{3}$");
let regexLastName = new RegExp("^([^0-9]*).{3}$");
let regexCity = new RegExp("^([^0-9]*).{3}$");

let orderButton = document.querySelector("#order");

function displayError(input, ErrorMsg, regex, type) {
  ErrorMsg = document.querySelector(`#${ErrorMsg}`);

  ErrorMsg.style.border = "2px solid transparent";
  ErrorMsg.style.margin = "1rem 0";
  ErrorMsg.style.padding = "1rem";
  ErrorMsg.style.display = "none";

  if (input == 0) {
    ErrorMsg.innerHTML = `Merci de renseigner ${type}`;
    ErrorMsg.style.borderColor = "red";
    ErrorMsg.style.display = "block";
  } else if (!regex.test(input)) {
    ErrorMsg.innerHTML = `Merci de renseigner ${type} valide`;
    ErrorMsg.style.borderColor = "red";
    ErrorMsg.style.display = "block";
  } else if (regex.test(input)) {
    ErrorMsg.innerHTML = "";
    ErrorMsg.style.display = "none";
  }
}

let emailInput = document.querySelector("#email");
emailInput.addEventListener("input", (e) => {
  displayError(
    e.target.value,
    "emailErrorMsg",
    regexEmail,
    "une adresse e-mail"
  );
  check();
});
let firstNameInput = document.querySelector("#firstName");
firstNameInput.addEventListener("input", (e) => {
  displayError(
    e.target.value,
    "firstNameErrorMsg",
    regexFirstName,
    "un prénom"
  );
  check();
});
let lastNameInput = document.querySelector("#lastName");
lastNameInput.addEventListener("input", (e) => {
  displayError(e.target.value, "lastNameErrorMsg", regexLastName, "un nom");
  check();
});
let cityInput = document.querySelector("#city");
cityInput.addEventListener("input", (e) => {
  displayError(e.target.value, "cityErrorMsg", regexCity, "une ville");
  check();
});
let addressInput = document.querySelector("#address");
addressInput.addEventListener("input", (e) => {
  check();
});

check();

function check() {
  const firstname = document.getElementById("firstName").value;
  const lastname = document.getElementById("lastName").value;
  const address = document.getElementById("address").value;
  const email = document.getElementById("email").value;
  const city = document.getElementById("city").value;

  let regexEmail = new RegExp(
    "^[a-zA-Z0-9.-_]+@{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  let regexFirstName = new RegExp("^([^0-9]*).{3}$");
  let regexLastName = new RegExp("^([^0-9]*).{3}$");
  let regexCity = new RegExp("^([^0-9]*).{3}$");

  let orderButton = document.querySelector("#order");

  if (
    !(
      regexFirstName.test(firstname) &&
      regexLastName.test(lastname) &&
      regexEmail.test(email) &&
      regexCity.test(city) &&
      address.length > 3
    )
  ) {
    orderButton.setAttribute("disabled", true);
    orderButton.style.opacity = "0.5";
    console.log("non");
  } else {
    orderButton.removeAttribute("disabled");
    orderButton.style.opacity = "1";
    console.log("gg");
  }
}

function confirmCart() {
  const productLS = getProductLS();
  // Nouveau tableau uniquement avec les id
  const newProduct = productLS.map((item) => {
    return item.id;
  });
  console.log(newProduct);
  const order = {
    contact: {
      // firstName: document.getElementById("firstName").value,
      // lastName: document.getElementById("lastName").value,
      // address: document.getElementById("address").value,
      // email: document.getElementById("email").value,
      // city: document.getElementById("city").value,
      firstName: "tony",
      lastName: "marques",
      address: "2rue montesq",
      email: "tony.marques@live.fr",
      city: "gargenville",
    },
    products: newProduct,
  };
  // console.log(JSON.stringify(order));

  const options = {
    method: "POST",
    body: JSON.stringify(order),
    headers: { "Content-Type": "application/json" },
  };

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(order),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("orderId", data.orderId);
      location.href = `confirmation.html?${data.orderId}`;
    });
}

// confirmCart();
