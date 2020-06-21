
/* next steps: agregar funcionalidad al buscador (muy simple, que coincida la palabra con el nombre
de algún producto)
*/


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


window.onload = function() {
    // crear lista de productos
    productList = new ProductList();
    updateProductList();
    // crear carrito
    cart = new Cart();
    cart.populate();
    updateCart();
    // agregar event listeners
    setEventListeners();
}

// agrega los event listeners a los elementos del HTML
function setEventListeners() {
    // agrega event listener al tocar una tecla (cualquiera) en el input de código de descuento
    discountCodeInput = document.getElementById("input-discount-code");
    discountCodeInput.addEventListener('keypress', addDiscountCodeOnEnter);
    // agrega event listener al hacer click en "aplicar código"
    codeSubmit = document.getElementById("submit-code");
    codeSubmit.addEventListener("click", addDiscountCode);
    // capturo todos los botones de "agregar al carrito"
    addProductBtns = document.getElementsByClassName("btn-add-product");
    // agrego event listener al hacer click en cada uno de los botones de "agregar al carrito"
    for (i = 0; i < addProductBtns.length; i++){
        addProductBtns[i].addEventListener("click", addToCart);
    }
}

// si se actualiza la página, queda guardado el carrito
function updateCart(){
    subtotalSpan = document.getElementById("cart-subtotal");
    subtotalSpan.innerHTML = `$${cart.getSubtotal()}`;
    shippingSpan = document.getElementById("cart-shipping");
    shippingSpan.innerHTML =  `$${cart.getShippingCost()}`;
    discountSpan = document.getElementById("cart-discount");
    discountSpan.innerHTML = `-$${cart.getDiscountPrice()}`;
    totalSpan = document.getElementById("cart-total");
    totalSpan.innerHTML = `$${cart.getTotal()}`;
    // agregar div de productos al carrito
    productsDiv = document.getElementById("products-cart");
    cart.getProducts().forEach(currentProduct => {
        productsDiv.innerHTML += productList.getCartProductHtml(currentProduct);
    });
    
} 
// actualiza el listado de productos
function updateProductList(){
    productListDiv = document.getElementById("product-list");
    productList.getProductList().forEach(currentProduct => {
        productListDiv.innerHTML += productList.getProductHtml(currentProduct);
    });
}

// agrega 1 producto al carrito y actualiza el total y subtotal del HTML
function addToCart(event){
    var productId = event.target.getAttribute("data-id"); // capturo el ID del producto que quiero agregar
    var productToAdd = productList.getProductById(productId);
    cart.addProduct(productToAdd);
    subtotalSpan.innerHTML = `$${cart.getSubtotal()}`;
    totalSpan.innerHTML = `$${cart.getTotal()}`;
    productsDiv.innerHTML += productList.getCartProductHtml(productToAdd);
}

// remueve productos desde la cruz del carrito
function removeProduct(productId){
    cart.removeProduct(productId);
    subtotalSpan.innerHTML = `$${cart.getSubtotal()}`;
    totalSpan.innerHTML = `$${cart.getTotal()}`;
    discountSpan.innerHTML = `-$${cart.getDiscountPrice()}`;
    var productToRemoveDiv = document.getElementById(`product-cart-${productId}`);
    productToRemoveDiv.parentNode.removeChild(productToRemoveDiv);
}

// chequea si el código de descuento ingresado es válido; si lo es, aplica el descuento y actualiza
// el total, sino, agrega un párrafo indicando que el código es inválido
function addDiscountCode(){
    var discountInput = discountCodeInput.value; // toma el código ingresado por el usuario
    if (discountInput.toUpperCase().trim() === "DESCUENTO500"){ // lleva el dato a mayúsculas y saca espacios si los tuviese para compararlo con el código de descuento que tengo 
        cart.addDiscountCode(code500); // agrega el descuento al carrito
        totalSpan.innerHTML = `$${cart.getTotal()}`; // actualiza el texto del total
        discountSpan.innerHTML = `-$${cart.getDiscountPrice()}`; // actualiza el texto del descuento
        var incorrectCodeParagraph = document.getElementById("incorrect-code"); // trae el párrafo que indica que el código es inválido
        if (incorrectCodeParagraph != undefined){ // chequea que el párrafo que indica código inválido exista en el HTML
            incorrectCodeParagraph.parentNode.removeChild(incorrectCodeParagraph); // si el código existe, remuevo el párrafo
        }  

    } else {
        var incorrectCode = document.getElementById("incorrect-code"); // trae el párrafo que indica que el código es inválido
        if (incorrectCode == undefined){ // chequea que el párrafo que indica código inválido NO exista en el HTML (para no mostrarlo más de una vez)
            var incorrectCode = document.createElement("p"); // creo el elemento párrafo cuando el código es inválio
            incorrectCode.innerHTML = "El código ingresado es inválido"; // le agrego texto al párrafo
            incorrectCode.id = "incorrect-code"; // le pongo un ID al párrafo
            var discountCodeDiv = document.getElementById("discount-code-div"); // obtengo el div del código de descuento
            discountCodeDiv.appendChild(incorrectCode); // agrego el párrafo al div y lo muestro
        }  
    }
}
// chequea si la tecla que se apretó en el input del código de descuento es enter 
// para agregar el código de descuento
function addDiscountCodeOnEnter(event) {
    if (event.keyCode == 13) { 
        addDiscountCode();        
     }
 }
 

// variable de buscador
var keysearch = "";
// variable de lista de categorías
var categoryList = ['Zapatos', 'Zapatillas', 'Borcegos'];
var selectedCategory = "";
// crea código de descuento
var code500 = new DiscountCode('DESCUENTO500', 500);