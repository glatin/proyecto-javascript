// Interactuar con el HTML

/* Modificar datos en pantalla a partir de ingresos del usuario. 
Ej: un monto, un porcentaje, una cantidad de cuotas.
Sumar o quitar elementos de la pantalla, dinámicamente mediante condiciones lógicas en JS
*/



// variables de categorías
const CATEGORYSHOES = 'Zapatos';
const CATEGORYSNEAKERS = 'Zapatillas';
const CATEGORYBOOTS = 'Borcegos';

// variable de buscador
var keysearch = "";

// variable de lista de categorías
var categoryList = [CATEGORYBOOTS, CATEGORYSHOES, CATEGORYSNEAKERS];
var selectedCategory = "";


// crear carrito
var cart = new Cart();
cart.populate();

// crea código de descuento
var code500 = new DiscountCode('DESCUENTO500', 500);