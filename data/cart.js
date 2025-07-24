export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionsId: '1'
    },{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionsId: '2'
    }];
  }
}

export function addToCart(productId, quantity){
  let matchingItem; 

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  let deliveryOptionsId = '1';

  if(matchingItem){
    matchingItem.quantity += quantity;
  } else {
    cart.push({productId, quantity, deliveryOptionsId});
  }

  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity(){
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
} 

export function updateDeliveryOption(productId, deliveryOptionsId){
  let matchingItem; 

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionsId = deliveryOptionsId;

  saveToStorage();
}

//example XHR
export function loadCart(fun){
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load', ()=>{
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

export async function loadCartFetch(){
  const response = await fetch('https://supersimplebackend.dev/cart');
  const result = await response.text();
  console.log(result);
}
