const cartProductsTable = document.querySelector(".cart-products");

window.addEventListener("load", () => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  let total = 0;
  if (cart) {
    cart.forEach((product) => {
      total = total + Number(product.productPrice) * product.noOfProducts;
      console.log(product.productPrice);
    });

    const cartTable = cart
      .map(
        (product) =>
          `<tr>
               <td><img src=${product.imgURL} style="height: 100px;"/></td>
               <td>${product.productName} </td>
               <td>${product.productPrice}$</td>
               <td><button data-product-id=${product.id} class="decrement btn btn-dark"> - </button>
			 				<span class="no-of-products">${product.noOfProducts}</span>
							<button data-product-id=${product.id} class="increment btn btn-dark"> + </button>
               </button></td>
               <td><button data-product-id=${product.id} class="delete btn btn-dark"> DELETE </button></td>
            </tr>`
      )
      .join("");

    cartTable.innerHTML = cartProductsTable;

    let totalPriceCard = `<div class="total"><h1>TOTAL: ${total}$</h1></div>`;
    document.querySelector(".cart-products").innerHTML = cartTable;
    document.querySelector(".total-price-container").innerHTML = totalPriceCard;
  }
});

const cartContainer = document.querySelector(".cart-container");
cartContainer.addEventListener("click", handleCartActions);

function handleCartActions(event) {
  const targetButton = event.target;
  let cart = JSON.parse(localStorage.getItem("cart"));
  const productInCart = cart.find(
    (productFromCart) =>
      productFromCart.id == targetButton.getAttribute("data-product-id")
  );
  let quantityParagraph = targetButton.parentNode.parentNode;

  if (targetButton.classList.contains("increment")) {
    productInCart.noOfProducts++;
  } else if (targetButton.classList.contains("decrement")) {
    if (productInCart.noOfProducts > 1) productInCart.noOfProducts--;
  } else if (targetButton.classList.contains("delete")) {
    productInCart.noOfProducts = 0;
    cart = cart.filter((product) => product.id != productInCart.id);
    console.log(
      cart,
      cart.filter((product) => product.id != productInCart.id)
    );
    targetButton.parentNode.parentNode.remove();
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  if (productInCart) {
    quantityParagraph.querySelector(".no-of-products").innerHTML =
      productInCart.noOfProducts;

    let total = 0;
    cart.forEach((product) => {
      total = total + Number(product.productPrice) * product.noOfProducts;
      console.log(typeof product.noOfProducts);
      console.log(product.productPrice);
    });
    let totalPriceCard = `<div><h1>TOTAL: ${total}$</h1></div>`;
    document.querySelector(".total-price-container").innerHTML = totalPriceCard;
  }
}
