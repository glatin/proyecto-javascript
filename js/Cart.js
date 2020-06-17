// constructor de objeto carrito de compras 
function Cart() {
    //variables que existen solo dentro de la función (locales/privadas)
    var subtotal = 0;
    var shippingCost = 0;
    var discountPrice = 0;
    var products = [];
    
    
    // método para sumar un producto al carrito
    this.addProduct = function (product) {
        subtotal += product.price;
        localStorage.setItem('cartSubtotal', subtotal);
        products.push(product);
        localStorage.setItem('cartProducts', JSON.stringify(products));
    };
    // método para aplicar código de descuento. Devuelve True si el descuento se puede aplicar correctamente.
    this.addDiscountCode = function (discountCode) {
        if (discountCode.getValue() <= this.getTotal()){
            discountPrice = discountCode.getValue();
            localStorage.setItem('cartDiscount', discountPrice);
            return true;
        }
        return false;
    };
    // método para sacar stock de los productos agregados al carrito y vaciar carrito
    this.completeOrder = function () {
        products.forEach(function (currentProduct) {
            currentProduct.stock -= 1;
        });
        subtotal = 0;
        shippingCost = 0;
        discountPrice = 0;
        products = []; 
        localStorage.clear();
    };
    // método para remover todos los productos del mismo ID del carrito (botón cruz)
    this.removeProduct = function (productId) {
        // nuevo array de productos donde se guardan los productos que NO se van a remover
        var productsAux = [];
        products.forEach(function (currentProduct) {
            if (productId === currentProduct.id) {
                //si hay que remover currentProduct, actualizo el subtotal 
                subtotal -= currentProduct.price;
                localStorage.setItem('cartSubtotal', subtotal);
            }
            else {
                //si no hay que remover currentProduct, actualizo el array de productos
                productsAux.push(currentProduct);
            }
        });
        products = productsAux;
        localStorage.setItem('cartProducts', JSON.stringify(products));
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
        products = this.getProducts();
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
    //método para obtener la lista de productos del carrito
    this.getProducts = function () {
        var cartProducts = localStorage.getItem('cartProducts');
        return JSON.parse(cartProducts) || [];
    };
}
