let label = document.getElementById('label')
let  shoppingCart= document.getElementById('shopping-cart')

let basket = JSON.parse(localStorage.getItem("data")) || [];

let shopItemsData;

function allItems() {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

allItems()

let generateCartItems = () =>{
    if(basket.length !== 0){
        return (shoppingCart.innerHTML = basket.map((x) => {
            let {id, item} = x
            let search = shopItemsData.find((y) => y.id === id || [])
            return `
            <div class="cart-item">
        <img width="100" src="static/images/tshirt2.avif" alt="" />
        <div class="details">

          <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.shirt_name}</p>
                <p class="cart-item-price">$ ${search.price}</p>
              </h4>
              <i onclick="remove(${id})" class=" text-danger fas fa-times"></i>
          </div>
          <div class="buttons">
                <i id=${id} class="text-center text-success fas fa-plus increment"></i>
                <p id=${id} class="quantity">${item}</p>
                <i id=${id} class="text-center text-danger fas fa-minus decrement"></i>
             </div>

          <h3>$ ${item * search.price}</h3>
        </div>
      </div>
      `;
        }).join(""));
    }else{
        shoppingCart.innerHTML=``;
        label.innerHTML = `
        <h2> Cart is Empty</h2>
        <a href="/eccomerce/templates/cart.html">
            <button class="btn btn-secondary">Back to home</button>
        </a>
        `;
    }
}



fetch('http://127.0.0.1:5000/shirts')
    .then((response) => response.json())
    .then((data) => {
        shopItemsData = data;

        // Call generateCartItems after data is fetched
        generateCartItems();


        let increment = document.querySelectorAll('.increment');
        let decrement = document.querySelectorAll('.decrement');

        increment.forEach((increment) => {
            increment.addEventListener('click', () => incre(increment.getAttribute('id')));
        });

        decrement.forEach((decrement) => {
            decrement.addEventListener('click', () => decre(decrement.getAttribute('id')));
        });
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });


function incre(id) {
    let search = basket.find((x) => x.id === id);

    if (search === undefined) {
        basket.push({
            id: id,
            item: 1,
        });
    } else {
        search.item += 1;
    }

    generateCartItems();
    updateItem(id);
    localStorage.setItem("data", JSON.stringify(basket));
}

function decre(id) {
    let search = basket.find((x) => x.id === id);
    if (search == undefined)return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    updateItem(id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
}

function updateItem(id) {
    let search = basket.find((x) => x.id === id);
    let quantityElement = document.querySelector(`.quantity[id="${id}"]`);
    quantityElement.textContent = search.item;
    allItems();
    TotalAmount()
}

let remove = (id)=>{
    basket = basket.filter((x) => x.id !== id);
    generateCartItems();
    TotalAmount();

    localStorage.setItem("data", JSON.stringify(basket));
};


let clearCart = () => {
    basket = [];
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket
            .map((x) => {
                let { item, id } = x;
                let search = shopItemsData.find((y) => y.id === id) || [];
                return item * search.price;
            })
            .reduce((x, y) => x + y, 0);

        label.innerHTML = `
          <h2>Total Bill : $ ${amount}</h2>
          <button class="checkout">Checkout</button>
          <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
    } else return;
};
TotalAmount()
