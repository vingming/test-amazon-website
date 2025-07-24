import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
//import '../data/cart-class.js';
//import '../data/data/car.js';
//import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart, loadCartFetch } from '../data/cart.js';

//why use async, well can used 'await', makes shortcut and readable
//u can only use await when u had async
async function loadPage(){
  try{
    //throw 'error1';
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ]);

    const value = await new Promise((resolve, reject)=>{
      //throw 'error2'; // reject (function) create an error in the future
      loadCart(()=>{
        //reject('error1');
        resolve('value3');
      });
    });
    
  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }
  
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

/*
// array of promises, runs all completely before next code execute
Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve('value2');
    });
  })
]).then((value)=>{
  console.log(value);
  renderOrderSummary();
  renderPaymentSummary();
});


//resolve controls 
new Promise((resolve)=>{
  loadProducts(()=>{
    resolve('value1');
  });
}).then((value) =>{
  console.log(value);
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  });
}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});


// nested 'callbacks' is not good, that's why use promises to keep code flat
loadProducts(()=>{
  loadCart(()=>{
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/