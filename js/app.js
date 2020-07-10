
// variables globales 
var productList;
var cart;
var discountCodeList;

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
var categoryList;
var allCategoryList;

$(document).ready(function () {
    // crear lista de productos
    productList = new ProductList();
    productList.initProductList();
    // crear carrito
    cart = new Cart();
    cart.populate();
    updateCart();
    // crea los códigos de descuento 
    discountCodeList = new DiscountCodeList();
    discountCodeList.initDiscountCodeList();
    // agregar event handlers 
    bindEventHandlers(); 
     
});

// agrega event handlers 
function bindEventHandlers() {
        // setea event handler para seleccionar categoría
        categoryList = $(".category");
        categoryList.click(function (e) {
            e.preventDefault();
            selectCategory(e.target.innerText);
            $(".category").css("font-weight","");
            $(e.target).css("font-weight","Bold");
            $(".all-categories").css("font-weight","");
    
        });
        // setea event handler para mostrar todos los productos cuando se selecciona ver todas las categorías
        allCategoryList = $(".all-categories");
        allCategoryList.click(function (e) {
            e.preventDefault();
            $(productListDiv).empty();
            productList.initProductList();
            $(e.target).css("font-weight","Bold");
            $(".category").css("font-weight","");
        });
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
    cart.renderProducts();
} 

// agrega 1 producto al carrito y actualiza el total y subtotal del HTML
function addToCart(productId){
    var productToAdd = productList.getProductById(productId);
    cart.addProduct(productToAdd);
    subtotalSpan.html(`$${cart.getSubtotal()}`);
    totalSpan.html(`$${cart.getTotal()}`);
    var cartItemQuantity = cart.getQuantityItem(productId);
    // si el producto ya está en el carrito, suma un ítem en lugar de una fila repetida
    if (cartItemQuantity == 1){
        $(productList.getCartProductHtml(productToAdd, 1)).appendTo(productsDiv).css('display', 'none').slideDown('slow'); //animación
    } else {
        $(`#product-cart-${productId} .quantity`).html(`${cartItemQuantity}`);
        $(`#product-cart-${productId} .total-price`).html(`${productToAdd.price * cartItemQuantity}`);
    }
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

// 
function selectCategory (productCategory){
    var productsWithCategory = productList.getProductByCategory(productCategory);
    $(productListDiv).empty();
    productsWithCategory.forEach(currentProduct => {
        var productHtml = productList.getProductHtml(currentProduct)
        $(productListDiv).append(productHtml);
    });

}

// aplica código de descuento en los casos que corresponda 
function addDiscountCode(){
    var discountInput = discountCodeInput.val(); // toma el código ingresado por el usuario
    var discountCode = discountCodeList.getDiscountCodebyCode(discountInput.toUpperCase().trim());
    $("#code-error").empty();
    // chequea que no se haya agregado un código de descuento antes
    if (cart.getDiscountPrice() != 0){
        $("#code-error").append('<p id="incorrect-code" style="color: red;">No es posible agregar más de un codigo de descuento por compra</p>');
    // chequea si el código ingresado existe
    } else if(discountCode == undefined){
        $("#code-error").append('<p id="incorrect-code" style="color: red;">El código ingresado es inválido</p>');
    //chequea que el valor del código de descuento no sea mayor al total de la compra
    } else if (cart.getTotal() < discountCode.value){ 
        $("#code-error").append('<p id="incorrect-code" style="color: red;">El valor del descuento es mayor al total, elegí más productos y probá nuevamente</p>');
    } else {
        cart.addDiscountCode(discountCode); // agrega el descuento al carrito
        totalSpan.html(`$${cart.getTotal()}`); // actualiza el texto del total
        discountSpan.html(`-$${cart.getDiscountPrice()}`); // actualiza el texto del descuento
    }
}

// variable de buscador
var keysearch = "";

