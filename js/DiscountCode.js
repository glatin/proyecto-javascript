// constructor de código de descuento de precio fijo 
function DiscountCode(code, value) {
    var code = code;
    var value = value;
    //método para obtener el valor del descuento
    this.getValue = function () {
        return value;
    };
}
