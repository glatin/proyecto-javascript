// constructor de objeto carrito de compras 
function Cart() {
    //variables que existen solo dentro de la función (locales/privadas)
    var subtotal = 0;
    var shippingCost = 0;
    var discountPrice = 0;
    var cartProducts = [];

     
    // método para sumar un producto al carrito
    this.addProduct = function (product) {
        subtotal += product.price;
        localStorage.setItem('cartSubtotal', subtotal);
        var productCart = this.findProduct(product);
        // si el producto no está, lo agrego
        if (productCart == undefined){
            productCart = new CartProduct(product);
            cartProducts.push(productCart);
        // si el producto está, incremento la cantidad
        } else {
            productCart.increaseQuantity();
        }
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    };

    // método para chequear si en el carrito está el producto agregado
    this.findProduct = function (product){
        var productResult;
        cartProducts.forEach(currentCartProduct => {
            if (currentCartProduct.product.id == product.id){
                productResult =  currentCartProduct;
            }
        });
        return productResult;
    }

    // método para mostrar productos en el carrito 
    this.renderProducts = function (){
        var productList = new ProductList();
        productsDiv = $("#products-cart");
        cartProducts.forEach(currentCartProduct => {
            $(productsDiv).append(productList.getCartProductHtml(currentCartProduct.product, currentCartProduct.quantity));
        });
    }
    
    // método para aplicar código de descuento. Devuelve True si el descuento se puede aplicar correctamente.
    this.addDiscountCode = function (discountCode) {
        if (discountCode.value <= this.getTotal()){
            discountPrice = discountCode.value;
            localStorage.setItem('cartDiscount', discountPrice);
            return true;
        }
        return false;
    };
    // método para remover descuento
    this.removeDiscountCode = function(){
        discountPrice = 0;
        localStorage.setItem('cartDiscount', discountPrice);
    }
    // método para sacar stock de los productos agregados al carrito y vaciar carrito
    this.completeOrder = function () {
        cartProducts.forEach(function (currentCartProduct) {
            currentCartProduct.products.stock -= currentCartProduct.quantity;
        });
        subtotal = 0;
        shippingCost = 0;
        discountPrice = 0;
        cartProducts = []; 
        localStorage.clear();
    };
    // método para remover todos los productos del mismo ID del carrito (botón cruz)
    this.removeProduct = function (productId) {
        cartProducts.forEach(function (currentCartProduct, index) {
            if (productId === currentCartProduct.product.id) {
                cartProducts.splice(index, 1);
                subtotal -= currentCartProduct.product.price * currentCartProduct.quantity;
                localStorage.setItem('cartSubtotal', subtotal);
                localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
            }
        });
        // si el total es negativo, sacar el descuento
        if (this.getTotal() < 0){
            this.removeDiscountCode();
        }
    };
    // método para sumar costo de envío
    this.setShippingCost = function (shippingPrice) {
        shippingCost = shippingPrice;
        localStorage.setItem('cartShippingCost', shippingCost);
    };
    
    // método para popular las variables del cart con los valores guardados en localStorage
    this.populate = function(){
        subtotal = this.getSubtotal();
        shippingCost = this.getShippingCost();
        discountPrice = this.getDiscountPrice();
        cartProducts = this.getCartProducts();
    }    
    
    // "getters"

    // método para obtener el total del carrito
    this.getTotal = function () {
        var total = subtotal + shippingCost - discountPrice;
        return total;
    };
    
    // método para obtener el subtotal
    this.getSubtotal = function () {
        var cartSubtotal = localStorage.getItem('cartSubtotal');
        return parseInt(cartSubtotal) || 0; // si cartSubtotal no tiene valor, me devuelve 0 (y evito el null)
    };
    //método para obtener costo de envío
    this.getShippingCost = function () {
        var cartShippingCost = localStorage.getItem('cartShippingCost');
        return parseInt(cartShippingCost) || 0;
    };
    //método para obtener el valor del descuento
    this.getDiscountPrice = function () {
        var cartDiscount = localStorage.getItem('cartDiscount');
        return parseInt(cartDiscount) || 0;
    };
    //método para obtener los productos del carrito
    this.getCartProducts = function () {
        var productsInCart = localStorage.getItem('cartProducts');
        return JSON.parse(productsInCart) || [];
    };
    // método para obtener la cantidad de ítems de un producto en el carrito
    this.getQuantityItem = function (productId){
        var itemQuantity = 0;
        cartProducts.forEach(function (currentCartProduct, index) {
            if (productId === currentCartProduct.product.id) {
                itemQuantity = currentCartProduct.quantity;
            }
        });
        return itemQuantity;
    }
}
