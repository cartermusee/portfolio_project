let products = [];
let cart = [];

//* selectors

const selectors = {
  products: document.querySelector(".products"),
  cartBtn: document.querySelector(".cart-btn"),
  cartQty: document.querySelector(".cart-qty"),
  cartClose: document.querySelector(".cart-close"),
  cart: document.querySelector(".cart"),
  cartOverlay: document.querySelector(".cart-overlay"),
  cartClear: document.querySelector(".cart-clear"),
  cartBody: document.querySelector(".cart-body"),
  cartTotal: document.querySelector(".cart-total"),
  cartcheckout: document.querySelector(".checkout"),
};

//* event listeners

const setupListeners = () => {
  document.addEventListener("DOMContentLoaded", initStore);

  // product event
  selectors.products.addEventListener("click", addToCart);

  // cart events
  selectors.cartBtn.addEventListener("click", showCart);
  selectors.cartOverlay.addEventListener("click", hideCart);
  selectors.cartClose.addEventListener("click", hideCart);
  selectors.cartBody.addEventListener("click", updateCart);
  selectors.cartClear.addEventListener("click", clearCart);
  selectors.cartcheckout.addEventListener("click", checkout);
};

//* event handlers

const initStore = () => {
  loadCart();
  loadProducts("http://143.198.231.39//shirts")
    .then(() => loadProducts("http://143.198.231.39//shorts"))
    .then(() => loadProducts("http://143.198.231.39//trousers"))
    
    .then(renderProducts)
    .finally(renderCart);
};

const showCart = () => {
  selectors.cart.classList.add("show");
  selectors.cartOverlay.classList.add("show");
};

const hideCart = () => {
  selectors.cart.classList.remove("show");
  selectors.cartOverlay.classList.remove("show");
};

const clearCart = () => {
  cart = [];
  saveCart();
  renderCart();
  renderProducts();
  setTimeout(hideCart, 500);
};

const addToCart = (e) => {
  if (e.target.hasAttribute("data-id")) {
    const id = parseInt(e.target.dataset.id);
    console.log("Adding product with ID:", id);
    const inCart = cart.find((x) => x.id === id);

    if (inCart) {
      alert("Item is already in the cart.");
      return;
    }

    cart.push({ id, qty: 1 });
    saveCart();
    renderProducts();
    renderCart();
    showCart();
  }
};

const removeFromCart = (id) => {
  cart = cart.filter((x) => x.id !== id);

  // if the last item is removed, close the cart
  cart.length === 0 && setTimeout(hideCart, 500);

  renderProducts();
};

const increaseQty = (id) => {
  const item = cart.find((x) => x.id === id);
  if (!item) return;

  item.qty++;
};

const decreaseQty = (id) => {
  const item = cart.find((x) => x.id === id);
  if (!item) return;

  item.qty--;

  if (item.qty === 0) removeFromCart(id);
};

const updateCart = (e) => {
  if (e.target.hasAttribute("data-btn")) {
    const cartItem = e.target.closest(".cart-item");
    const id = parseInt(cartItem.dataset.id);
    const btn = e.target.dataset.btn;

    btn === "incr" && increaseQty(id);
    btn === "decr" && decreaseQty(id);

    saveCart();
    renderCart();
  }
};

const saveCart = () => {
  localStorage.setItem("eccomerce", JSON.stringify(cart));
};

const loadCart = () => {
  cart = JSON.parse(localStorage.getItem("eccomerce")) || [];
};

//* render functions

const renderCart = () => {
  // show cart qty in navbar
  const cartQty = cart.reduce((sum, item) => {
    return sum + item.qty;
  }, 0);

  selectors.cartQty.textContent = cartQty;
  selectors.cartQty.classList.toggle("visible", cartQty);

  // show cart total
  selectors.cartTotal.textContent = calculateTotal().format();

  // show empty cart
  if (cart.length === 0) {
    selectors.cartBody.innerHTML =
      '<div class="cart-empty">Your cart is empty.</div>';
    return;
  }

  // show cart items
  selectors.cartBody.innerHTML = cart
    .map(({ id, qty }) => {
      // get product info of each cart item
      const product = products.find((x) => x.id === id);

      const { shirt_name, trousers_name,shorts_name, img, price,description } = product;

      const itemName = shirt_name || trousers_name || shorts_name;;
      const amount = price * qty;
      const imgUrl = `static/images/${img}`;

      return `
        <div class="cart-item" data-id="${id}">
          <div class="cart-item-detail">
            <img src="${imgUrl}" alt="${itemName}" />
            <h3>${itemName}</h3>
            <h3>${description}</h3>
            <h5>${price.format()}</h5>
            <div class="cart-item-amount">
              <i class="bi bi-dash-lg" data-btn="decr"></i>
              <span class="qty">${qty}</span>
              <i class="bi bi-plus-lg" data-btn="incr"></i>

              <span class="cart-item-price">
                ${amount.format()}
              </span>
            </div>
          </div>
        </div>`;
    })
    .join("");
};

const renderProducts = () => {
  selectors.products.innerHTML = products
    .map((product) => {
      const { id, shirt_name, trousers_name,shorts_name, img, price,description } = product;

      // check if product is already in cart
      const inCart = cart.find((x) => x.id === id);

      // make the add to cart button disabled if already in cart
      const disabled = inCart ? "disabled" : "";

      // change the text if already in cart
      const text = inCart ? "Added in Cart" : "Add to Cart";
      
      const itemName = shirt_name || trousers_name || shorts_name;;
      const imgUrl = `static/images/${img}`;
      const link = `/${shirt_name ? 'shirts' : 'trousers'}/${id}`; // Assuming you have routes for shirts and trousers

      return `
    <div class="product">
     <a href="${link}"><img src="${imgUrl}" alt="${itemName}" /></a>
     <h3>Name: ${itemName}</h3>
      <h3>${description}</h3>
      <h5>Price: ${price.format()}</h5>
      <button ${disabled} data-id=${id}>${text}</button>
    </div>
    `;
    })
    .join("");
};

//* api functions

const loadProducts = async (apiURL) => {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`http error! status=${response.status}`);
    }
    const newProducts = await response.json();
    products = products.concat(newProducts);
    // console.log(products);
  } catch (error) {
    console.error("fetch error:", error);
  }
};

//* helper functions

const calculateTotal = () => {
  return cart
    .map(({ id, qty }) => {
      const { price } = products.find((x) => x.id === id);

      return qty * price;
    })
    .reduce((sum, number) => {
      return sum + number;
    }, 0);
};

Number.prototype.format = function () {
  return this.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const checkout = ()=>{
  // URL for the POST request
  const url = 'Access-Control-Allow-Origin https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

  // Data 
  const data = {
    "BusinessShortCode": 174379,
    "Password": "x",
    "Timestamp": "20231208230947",
    "TransactionType": "CustomerPayBillOnline",
    "Amount": 1,
    "PartyA": 254726114885,
    "PartyB": 174379,
    "PhoneNumber": 254726114885,
    "CallBackURL": "http://127.0.0.1:5000",
    "AccountReference": "CompanyXLTD",
    "TransactionDesc": "Payment of X" 
  };

  // Configuration for the fetch request
  const requestOptions = {
    method: 'POST',
    headers: {
      'Key': 'Authorization', 
      'Value': 'Basic NHdDVEtHM3VIaVFrakhJa1JsZEFadkpEUTFLSjd1cVQ6OE1WUzVoYUlBa2dOejlvRw==',

    },
    body: JSON.stringify(data) 
  };


  fetch(url, requestOptions)
  .then(response => {
    console.log(response);
    return response.json();
  })
  .then(data => {
    console.log('Response data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

//* initialize

setupListeners();

