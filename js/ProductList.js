function ProductList(){
    var list = [];
    var localProductList = this; // la defino de esta forma para poder llamarla desde el success del ajax (línea 42)

    // retorna producto por ID
    this.getProductById = function(id){
        var productWithId;
        list.forEach(function(currentProduct){
            if (id == currentProduct.id){
                productWithId = currentProduct;
            }
        });
        return productWithId;
    }

    // retorna productos por categoría
    this.getProductByCategory = function(category){
        var productsWithCategory = [];
        list.forEach(function(currentProduct){
            if (category == currentProduct.category){
                productsWithCategory.push(currentProduct);
            }
        });
        return productsWithCategory;
    }

    // actualiza el listado de productos
   this.updateProductList = function(){
        productListDiv = $("#product-list");
        list.forEach(currentProduct => {
            productListDiv.append(this.getProductHtml(currentProduct));
        });
    }
    
    // carga la lista de productos 
    this.initProductList = function() {
        $.ajax({
            type: "GET",
            url: "data/product-data.json",
            success: function (response) {
                list = response;
                localProductList.updateProductList();
            },
            error : function() {
                $("#product-list").append('<p style="font-size: 55px; text-align: center;" > Error el cargar el listado de productos</p>');
            },      
        });
    }
    
    // retorna el array de JSON con todos los productos
    this.getProductList = function(){
        return list;
    }

    // retorna el HTML de un producto para agregar al listado
    this.getProductHtml = function(product) {
        return `
            <div class="col-lg-4 mb-4 text-center">
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
    this.getCartProductHtml = function(productCart, quantity){
        return `
            <div class="product-cart d-flex" id = "product-cart-${productCart.id}">
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
                        <span class="quantity">${quantity}</span>
                    </div>
                </div>
                <div class="one-eight text-center">
                    <div class="display-tc">
                        <span class="total-price">${productCart.price * quantity}</span>
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
