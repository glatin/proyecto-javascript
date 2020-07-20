// función constructora de productos en el carrito con sus cantidades
function CartProduct(product, quantity){
    this.product = product;
    this.quantity = quantity;
    // método para incrementar un ítem de un producto
    this.increaseQuantity = function(){
        console.log("increase");        
        this.quantity ++;
    }
}




