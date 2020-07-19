// función constructora de productos en el carrito con sus cantidades

function CartProduct(product){
    this.quantity = 1;
    this.product = product;
    // método para incrementar un ítem de un producto
    this.increaseQuantity = function(){
        this.quantity ++;
    }
}




