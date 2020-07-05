
// variables globales 
var productList;
var cart;
// variables globales del HTML
var subtotalSpan;
var shippingSpan;
var discountSpan;
var totalSpan;
var discountCodeInput;
var codeSubmit;
var addProductBtns;
var productsDiv;
var productListDiv;

$(document).ready(function () {
     // crear lista de productos
     productList = new ProductList();
     productList.initProductList();
     // crear carrito
     cart = new Cart();
     cart.populate();
     updateCart();
     // agregar event handlers 
     bindEventHandlers();
});

// agrega event handlers 
function bindEventHandlers() {
    // setea event handler para aplicar código de descuento con enter
    discountCodeInput = $("#input-discount-code");
    discountCodeInput.keypress(function (e) { 
        if (e.keyCode == 13) { 
            addDiscountCode();        
         }
    });
    // setea event handler para aplicar código de descuento con click
    codeSubmit = $("#submit-code");
    codeSubmit.click(function (e) { 
        e.preventDefault();
        addDiscountCode();
    });
    /*// setea event handler a los botones de agregar al carrito    
    addProductBtns = $(".btn-add-product");
    addProductBtns.click(function(e){
        addToCart(e);
    })
    */
}
// si se actualiza la página, queda guardado el carrito
function updateCart(){
    subtotalSpan = $("#cart-subtotal");
    subtotalSpan.html(`$${cart.getSubtotal()}`);
    shippingSpan = $("#cart-shipping");
    shippingSpan.html(`$${cart.getShippingCost()}`);
    discountSpan = $("#cart-discount");
    discountSpan.html(`-$${cart.getDiscountPrice()}`);
    totalSpan = $("#cart-total");
    totalSpan.html(`$${cart.getTotal()}`);
    // agrega div de productos al carrito
    productsDiv = $("#products-cart");
    cart.getProducts().forEach(currentProduct => {
        $(productList.getCartProductHtml(currentProduct)).appendTo(productsDiv);
    });
    
} 

// agrega 1 producto al carrito y actualiza el total y subtotal del HTML
function addToCart(productId){
    var productToAdd = productList.getProductById(productId);
    cart.addProduct(productToAdd);
    subtotalSpan.html(`$${cart.getSubtotal()}`);
    totalSpan.html(`$${cart.getTotal()}`);
    $(productList.getCartProductHtml(productToAdd)).appendTo(productsDiv).css('display', 'none').slideDown('slow'); //animación

}

// remueve productos desde la cruz del carrito
function removeProduct(productId){
    cart.removeProduct(productId);
    subtotalSpan.html(`$${cart.getSubtotal()}`);
    totalSpan.html(`$${cart.getTotal()}`);
    discountSpan.html(`-$${cart.getDiscountPrice()}`);    
    $(`#product-cart-${productId}`).slideUp('slow', function(){ // animación
        $(`#product-cart-${productId}`).remove();
    });

}
// chequea si el código de descuento ingresado es válido; si lo es, aplica el descuento y actualiza
// el total, sino, agrega un párrafo indicando que el código es inválido
function addDiscountCode(){
    var discountInput = discountCodeInput.val(); // toma el código ingresado por el usuario
    if (discountInput.toUpperCase().trim() === "DESCUENTO500"){ // lleva el dato a mayúsculas y saca espacios si los tuviese para compararlo con el código de descuento que tengo 
        cart.addDiscountCode(code500); // agrega el descuento al carrito
        totalSpan.html(`$${cart.getTotal()}`); // actualiza el texto del total
        discountSpan.html(`-$${cart.getDiscountPrice()}`); // actualiza el texto del descuento
        var incorrectCodeParagraph = $("#incorrect-code"); // trae el párrafo que indica que el código es inválido
        if (incorrectCodeParagraph.length != 0){ // chequea que el párrafo que indica código inválido exista en el HTML
            incorrectCodeParagraph.remove(); // si el código existe, remuevo el párrafo
        }  

    } else {
        var incorrectCode = $("#incorrect-code"); // trae el párrafo que indica que el código es inválido
        if (incorrectCode.length == 0){ // chequea que el párrafo que indica código inválido NO exista en el HTML (para no mostrarlo más de una vez)
            var incorrectCode = $("<p>"); // creo el elemento párrafo cuando el código es inválio
            incorrectCode.html("El código ingresado es inválido"); // le agrego texto al párrafo            
            incorrectCode.attr("id", "incorrect-code"); // le pongo un ID al párrafo
            var discountCodeDiv = $("#discount-code-div"); // obtengo el div del código de descuento
            discountCodeDiv.append(incorrectCode); // agrego el párrafo al div y lo muestro
        }  
    }
}

// variable de buscador
var keysearch = "";
// variable de lista de categorías
var categoryList = ['Zapatos', 'Zapatillas', 'Borcegos'];
var selectedCategory = "";
// crea código de descuento
var code500 = new DiscountCode('DESCUENTO500', 500);