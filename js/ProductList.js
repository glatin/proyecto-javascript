function ProductList(){
    var list = [];

    // retorna producto por ID
    this.getProductById = function(id){
        var productWithId;
        list.forEach(function(currentProduct){
            if (id == currentProduct.id){
                productWithId = currentProduct;
            }
        })
        return productWithId;
    }
    // actualiza el listado de productos
    function updateProductList(){
        productListDiv = $("#product-list");
        list.forEach(currentProduct => {
            productListDiv.append(getProductHtml(currentProduct));
        });
    }
    
    // carga la lista de productos 
    this.initProductList = function() {
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8080/data/product-data.json",
            success: function (response) {
                list = response;
                updateProductList();
            }
        });
    }
    
    // retorna el array de JSON con todos los productos
    this.getProductList = function(){
        console.log('success-despues')
        return list;
    }

    // retorna el HTML de un producto para agregar al listado
    function getProductHtml(product) {
        return `<div class="col-lg-4 mb-4 text-center">
        <div class="product-entry border">
            <a href="#" class="prod-img">
                <img src=${product.img} class="img-fluid">
            </a>
            <div class="desc">
                <h2>${product.name}</h2>
                <span class="price">${"$"+ product.price}</span>
                <a class="btn btn-primary btn-lg btn-add-product" onclick="addToCart(${product.id})">Agregar al carrito</a>
            </div>
        </div> 
    </div>` 
    }
    // retorna el HTLM del producto para agregarlo al listado de productos del carrito
    this.getCartProductHtml = function(productCart){
        return `<div class="product-cart d-flex" id = "product-cart-${productCart.id}">
        <div class="one-forth">
            <div class="product-img" style="background-image: url(${productCart.img});">
            </div>
            <div class="display-tc">
                <h3>${productCart.name}</h3>
            </div>
        </div>
        <div class="one-eight text-center">
            <div class="display-tc">
                <span class="price">${productCart.price}</span>
            </div>
        </div>
        <div class="one-eight text-center">
            <div class="display-tc">
                <span class="price">x 1</span>
            </div>
        </div>
        <div class="one-eight text-center">
            <div class="display-tc">
                <span class="price">${productCart.price}</span>
            </div>
        </div>

        <div class="one-eight text-center">
            <div class="display-tc">
                <a class="closed" onclick="removeProduct(${productCart.id})"></a>
            </div>
        </div>
    </div>
    `
    }
    
}


