let shop = document.querySelector('.shop');
// let basket = [];

let basket = JSON.parse(localStorage.getItem("data")) || [];
let generateShop = (shopItemsData) => {
    return (shop.innerHTML = shopItemsData
        .map((x) => {
            let { id, shirt_name, description,price} = x;
            return `
            <div id=product-id-${id} class="all">
                <div>
                    
                </div>
                <img src="static/images/tshirt1.jpg" class="" alt="...">
                <div>
                    <p>${shirt_name}</p>
                    <p>${description}</p>
                    <p>${price}$</p>
                    <p class="stock"></p>
                    <div class="add-sub">
                        <a href="cart.html" class="btn btn-secondary btn-sm">Add to cart</a>
                        <div class="minusPlus">
                            <i id=${id} class="fas fa-plus increment"></i>
                            <p id=${id} class="quantity ">0</p>
                            <i id=${id} class="fas fa-minus decrement"></i>
                        </div>
                    </div>
                </div>
            </div>`;
        })
        .join(''));
};

// Fetch data from the API
fetch('http://127.0.0.1:5000/shirts')
    .then((response) => response.json())
    .then((data) => {
        // Update shopItemsData with fetched data
        let shopItemsData = data;

        // Generate shop items with the updated data
        generateShop(shopItemsData);

        // Set up event listeners
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

    updateItem(id);
    localStorage.setItem("data", JSON.stringify(basket));
}

function decre(id) {
    let search = basket.find((x) => x.id === id);
    if (search == undefined)return
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    updateItem(id);
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
}

function updateItem(id) {
    let search = basket.find((x) => x.id === id);
    let quantityElement = document.querySelector(`.quantity[id="${id}"]`);
    quantityElement.textContent = search.item;
    allItems();
}

function allItems() {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
allItems()