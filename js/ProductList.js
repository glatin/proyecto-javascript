function ProductList(){
    var list = [
        {
            "id": 23,
            "name": "APRIL",
            "price": 5339,
            "img": "images/item-1.jpg",
            "category": "Borcegos",
            "stock": 10
        },
        {
            "id": 24,
            "name": "AMERICA",
            "price": 4199,
            "img": "images/item-2.jpg",
            "category": "Zapatos",
            "stock": 5
        },
        {
            "id": 25,
            "name": "NASA",
            "price": 3999,
            "img": "images/item-3.jpg",
            "category": "Zapatillas",
            "stock": 5
        },
        {
            "id": 26,
            "name": "SPACE",
            "price": 2880,
            "img": "images/item-4.jpg",
            "category": "Zapatillas",
            "stock": 5
        },
        {
            "id": 27,
            "name": "LOLA",
            "price": 5149,
            "img": "images/item-5.jpg",
            "category":"Zapatos",
            "stock": 5
        },
        {
            "id": 28,
            "name": "ELON",
            "price": 2380,
            "img": "images/item-6.jpg",
            "category":"Zapatillas",
            "stock": 5
        }
    ]
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
    // retorna el array de JSON con todos los productos
    this.getProductList = function(){
        return list;
    }
    // retorna el HTML de un producto para agregar al listado
    this.getProductHtml = function(product){
        return `<div class="col-lg-4 mb-4 text-center">
        <div class="product-entry border">
            <a href="#" class="prod-img">
                <img src=${product.img} class="img-fluid" alt="Free html5 bootstrap 4 template">
            </a>
            <div class="desc">
                <h2>${product.name}</h2>
                <span class="price">${"$"+ product.price}</span>
                <a class="btn btn-primary btn-lg btn-add-product" data-id=${product.id}>Agregar al carrito</a>
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


