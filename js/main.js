// variables de categorías
const CATEGORYSHOES = 'Zapatos';
const CATEGORYSNEAKERS = 'Zapatillas';
const CATEGORYBOOTS = 'Borcegos';
// variable de buscador
var keysearch = "";
// variable de lista de categorías
var categoryList = [CATEGORYBOOTS, CATEGORYSHOES, CATEGORYSNEAKERS];
var selectedCategory = "";

// crear productos
var april = new Product(23, 'APRIL', 5339, 'images/item-1.jpg', CATEGORYBOOTS, 10);
var america = new Product(24,'AMERICA', 4199, 'images/item-2.jpg',CATEGORYSHOES, 5);
var nasa = new Product(25,'NASA', 3999, 'images/item-3.jpg', CATEGORYSNEAKERS, 5);
var space = new Product(26,'SPACE', 2880, 'images/item-4.jpg',CATEGORYSNEAKERS, 5);
var lola = new Product(27,'LOLA', 5149, 'images/item-5.jpg',CATEGORYSHOES, 5);
var elon = new Product(28,'ELON', 2380, 'images/item-6.jpg',CATEGORYSNEAKERS, 5);

// crear carrito
var cart = new Cart();

// crea código de descuento
var code500 = new DiscountCode('DESCUENTO500', 500);


// constructor de objeto producto
function Product(id, name, price, image, category, stock){
    //variables
    var id = id;
    var name = name;
    var price = price;
    var image = image;
    var category = category;
    var stock = stock;
    //método para restar stock
    this.removeStock = function (quantity) {
        stock -= quantity;
    }
    //"getters"
    // método para obtener ID
    this.getId = function(){
        return id;
    }
    // método para obtener nombre del producto
    this.getName = function(){
        return name;
    }
    // método para obtener precio del producto
    this.getPrice = function(){
        return price;
    }
    // método para obtener imagen del producto
    this.getImage = function(){
        return image;
    }
    // método para obtener categoría del producto
    this.getCategory = function(){
        return category;
    }
    // método para obtener cantidad de stock disponible del producto
    this.getStock = function(){
        return stock;
    }
}
// constructor de objeto carrito de compras 
function Cart(){
    //variables que existen solo dentro de la función (locales/privadas)
    var subtotal = 0;
    var shippingCost = 0;
    var discountPrice = 0;
    var products = [];
    // método para sumar un producto al carrito
    this.addProduct = function (product){
        subtotal += product.getPrice();
        products.push(product);
    }
    // método para aplicar código de descuento
    this.addDiscountCode = function (discountCode) {
        discountPrice = discountCode.getValue();
    }
    // método para sacar stock de los productos agregados al carrito
    this.completeOrder = function(){
        products.forEach(function(currentProduct) {
            currentProduct.removeStock(1);
        });
    }
    // método para remover todos los productos del mismo ID del carrito (botón cruz)
    this.removeProduct = function(productId){
        // nuevo array de productos donde se guardan los productos que NO se van a remover
        var productsAux = [];
        products.forEach(function(currentProduct){
            if(productId === currentProduct.getId()){
                //si hay que remover currentProduct, actualizo el subtotal 
                subtotal -= currentProduct.getPrice();
            } else{
                //si no hay que remover currentProduct, actualizo el array de productos
                productsAux.push(currentProduct);
            }
        });
        products = productsAux;
    }
        
    // método para sumar costo de envío
    this.setShippingCost = function(shippingPrice){
        setShippingCost = shippingPrice;
    }
    // método para obtener el total del carrito
    this.getTotal = function() {
        var total = subtotal + shippingCost - discountPrice;
        return total;
    }
    // "getters"
    // método para obtener el subtotal
    this.getSubtotal = function(){
        return subtotal;
    }
    //método para obtener costo de envío
    this.getShippingCost = function(){
        return shippingCost;
    }
    //método para obtener el valor del descuento
    this.getDiscountPrice = function(){
        return discountPrice;
    }
    //método para obtener la lista de productos del carrito
    this.getProducts = function(){
        return products;
    }
}
// constructor de código de descuento de precio fijo 
function DiscountCode (code, value){
    var code = code;
    var value = value;

    //método para obtener el valor del descuento
    this.getValue = function(){
        return value;
    }
}
