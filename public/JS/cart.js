
function actualizarTotalProducto(idIndex) {

  // traemos los datos guardados
  const cantidad = document.querySelector(`#cantidad${idIndex}`);
  const precioUnitario = document.querySelector(`#precioProducto${idIndex}`);
  const subtotalProducto = document.querySelector(`#subtotalProducto${idIndex}`);
  const product_sku = document.querySelector(`#idSku${idIndex}`);
  
  let cantidadProducto = Number(cantidad.value);      // valor de cantidad parseado a numero
  let precioProducto = Number(precioUnitario.value);  // valor unitario del producto
  let subtotal = cantidadProducto * precioProducto    
  
  subtotalProducto.textContent = subtotal.toString(); // el subtotal parseado a string

  var datos = {    // datos a enviar
    product_sku: product_sku.value,
    cantidad: cantidad.value
  };

  // Realiza la solicitud POST usando fetch
  fetch('/shop/updateItem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Indica que estás enviando datos en formato JSON
    },
    body: JSON.stringify(datos) // Convierte el objeto a JSON
  })


  location.reload();    // recargamos la pagina

}


// actualiza el resumen sumando los subtotales por producto
function actualizarResumenCarrito() {
  // seleccionamos los elementos donde se muestran los resultados
const cantidadProductos = document.querySelector('#cantidadProductos');
const subtotalFactura = document.querySelector('#subtotalFactura');
const envio = document.querySelector('#envio');
const totalFactura = document.querySelector('#totalFactura');
// index: donde guardamos el numero de productos que hay en el carrito
const index = Number(document.querySelector('#index').getAttribute('value'));
// acumuladores
let cantidadTotalProductos = 0;
let subtotal = 0;
// con un bucle for recorremos los elementos del document donde estan cargados los productos
for(let idIndex = 0; idIndex < Number(index); idIndex++ ) {

  // guardamos la cantidad y el subtotal de cada producto
  const cantidad = document.querySelector(`#cantidad${idIndex}`).getAttribute('value'); 
  const subtotalProducto = document.querySelector(`#subtotalProducto${idIndex}`).getAttribute('value');
  
  // los sumamos a los acumuladores
  cantidadTotalProductos += Number(cantidad);
  subtotal += Number(subtotalProducto);

}

  cantidadProductos.textContent = cantidadTotalProductos.toString(); // mostramos la cantidad total de productos
  subtotalFactura.textContent = subtotal.toString() // mostramos el subtotal de la factura
  let precioEnvio = 1000  // envio valor $1000
  envio.textContent =+ precioEnvio.toString(); // mostramos el valor del envio
  let total = subtotal + precioEnvio; // le sumamos el envio al subtotal
  totalFactura.textContent = total.toString();  // mostramos el total de la facturación

}

function suma(idIndex) {
  const cantidad = document.querySelector(`#cantidad${idIndex}`);
  
  cantidad.value = Number(cantidad.value) + 1; // incrementa en 1 cantidad

  actualizarTotalProducto(idIndex); // actualiza el subtotal del producto

}

function resta(idIndex) {
  const cantidad = document.querySelector(`#cantidad${idIndex}`);
  
  cantidad.value = Number(cantidad.value) < 2 ? 1 : Number(cantidad.value) - 1 // si cantidad es mayor a 1 resta 1 en cantidad

  actualizarTotalProducto(idIndex);

}

function actualizarCantidad(idIndex) {
  const cantidad = document.querySelector(`#cantidad${idIndex}`);
  
  cantidad.value = Number(cantidad.value) < 1 ? 1 : Number(cantidad.value); // si se introduce directo en el input el valor minimo es 0
  
  actualizarTotalProducto(idIndex);

}

