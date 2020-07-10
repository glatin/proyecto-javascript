function DiscountCodeList(){
    var codeList = [];
    var localCodelist = this;

    // carga lista de códigos de descuento
    this.initDiscountCodeList = function() {           
        $.ajax({
            type: "GET",
            url: "data/discounts-code-data.json",
            success: function (response) {
                codeList = response;
            },
            error : function() {

                $("#discount-code-div").append('<p style="font-size: 15px; color: red;" > Hubo un error al cargar los códigos de descuento</p>');
            }, 
                
        })
    }
    // obtener el código por su nombre
    
    this.getDiscountCodebyCode = function (code) {
        var discountCode;
        codeList.forEach(currentCode => {
            if (code == currentCode.code){
                discountCode = currentCode;
            }
        });
        return discountCode;
      }

}