
//ADDING TO CART//

let addToCartButtons = document.querySelectorAll('.add');
let cartContainerDOM = document.querySelector('.cart-container');
let insideCart = (JSON.parse(localStorage.getItem('cart-key')) || []); //need to add OR with an empty array as filter method would't work on a null value 



if (insideCart.length > 0) {
  insideCart.forEach(cartItem => {
    const product = cartItem;
    insertToDOM(product);
    countCartTotal();

    addToCartButtons.forEach(addToCartButton => {
      const productDom = addToCartButton.parentNode;

      if (productDom.querySelector('.product-name').innerText === product.name) {
        actionButtonHandler(addToCartButton, product); 

      }
    });

  });
}


addToCartButtons.forEach(addToCartButton => { //could omit parentheses for this paramater as there is only one//
  addToCartButton.addEventListener('click', () => {
    
    const productDom = addToCartButton.parentNode;
    
    const product = {
      image: productDom.querySelector('.product-image').getAttribute('src'), //
      name: productDom.querySelector('.product-name').innerText,
      price: productDom.querySelector('.product-price').innerText,
      quantity: 1,
    };

    
    const isInCart = (insideCart.filter(cartItem => (cartItem.name === product.name)).length > 0);
    
    if (isInCart === false) { //if item is not in the cart, it will be created
      
      insertToDOM(product); //product is safe to pass as an argument as it has been defined above before being used
      insideCart.push(product);
      
      saveCart();

      actionButtonHandler(addToCartButton, product); 
        
    }
  });
});

function insertToDOM(product) {
  cartContainerDOM.insertAdjacentHTML('beforeend', `
    <div class="cart-item">
      <img class="cart-item-image" src="${product.image}" alt="${product.name}">
      <div class="name-price">
        <h5 class="cart-item-name">${product.name}</h5>  
        <h6 class="cart-item-price">£${product.price}</h6>
      </div>
      <div class="cart-item-actions">  
        <button class="cart-decrease-quantity-button">&minus;</button> 
        <h5 class="cart-item-quantity">${product.quantity}</h5>
        <button class="cart-increase-quantity-button">&plus;</button> 
        <button class="cart-item-remove-button">&times;</button>
      </div>
    </div>
`);

addCartActionFooter();

}

function actionButtonHandler(addToCartButton, product) {
  addToCartButton.innerText = 'in cart';

  const cartItemsDOM = cartContainerDOM.querySelectorAll('.cart-item');
  cartItemsDOM.forEach(cartItemDOM => {

    if (cartItemDOM.querySelector('.cart-item-name').innerText === product.name) {
      cartItemDOM.querySelector('.cart-increase-quantity-button').addEventListener('click', () => increaseItemQuantity(product, cartItemDOM));

      cartItemDOM.querySelector('.cart-decrease-quantity-button').addEventListener('click', () => decreaseItemQuantity(product, cartItemDOM, addToCartButton));

      cartItemDOM.querySelector('.cart-item-remove-button').addEventListener('click', () => removeItem(product, cartItemDOM, addToCartButton));

    }
        
  });
}




function increaseItemQuantity(product, cartItemDOM) {
  insideCart.forEach(cartItem => {
    if (cartItem.name === product.name) {
      cartItemDOM.querySelector('.cart-item-quantity').innerText = ++cartItem.quantity;
      saveCart();
    }
  
  });
}



function decreaseItemQuantity(product, cartItemDOM, addToCartButton) {
  insideCart.forEach(cartItem => {
             
    if (cartItem.name === product.name) {
      if (cartItem.quantity > 1) {
        cartItemDOM.querySelector('.cart-item-quantity').innerText = --cartItem.quantity;
        saveCart();
      } else {
        removeItem(product, cartItemDOM, addToCartButton); //re-using code
  
      }

    }
  
  });
}



function removeItem(product, cartItemDOM, addToCartButton) {
   cartItemDOM.remove(); 
   insideCart = insideCart.filter(cartItem => cartItem.name !== product.name);
   
   saveCart();

   
   addToCartButton.innerText = 'add to cart';

   if (insideCart.length < 1) {
    document.querySelector('.cart-actions').remove();
   
   }
}



function addCartActionFooter() {
  if (document.querySelector('.cart-actions') === null) { //this will only run if there isn't yet a footer in the dom (before any cart items are added)
    cartContainerDOM.insertAdjacentHTML('afterend', `
      <div class="cart-actions">
        <button class="clear-cart">clear cart</button>
        <button class="check-out">check out</button>
      </div>
    `);

    document.querySelector('.clear-cart').addEventListener('click', () => clearCart()); //has to be run after inserting cart-actions html, otherwise there is nothing to clear
    
  }
}



function clearCart() {
  cartContainerDOM.querySelectorAll('.cart-item').forEach(cartItemDOM => {
    cartItemDOM.remove(); //this will remove all items from the cartDOM, same as remove in 'REMOVE-ITEMS'

  });
  
  insideCart = [];
  localStorage.removeItem('cart-key');
  document.querySelector('.cart-actions').remove(); //if the insideCart array is empty (from removing the item) - cart actions are removed

  addToCartButtons.forEach(addToCartButton => {
    addToCartButton.innerText = 'add to cart';
  });
  
}



function countCartTotal() {

  let cartTotal = 0;
  insideCart.forEach(cartItem => {
    cartTotal += cartItem.quantity * cartItem.price;
  });
  document.querySelector('.check-out').innerText = `Pay £${cartTotal}`;
  
}

function saveCart() {
  localStorage.setItem('cart-key', JSON.stringify(insideCart));
  countCartTotal();
  
  
}

// function checkOut() {
//   document.querySelector('.check-out').addEventListener('click', () => {
//     alert('you will now be re-directed to check out')
//   });

// }
