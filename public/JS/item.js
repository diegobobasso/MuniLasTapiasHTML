const suma = document.querySelector('#suma');
const resta = document.querySelector('#resta');
const cantidad = document.querySelector('#cantidad');

suma.addEventListener('click', () => cantidad.value = Number(cantidad.value) + 1);

resta.addEventListener('click', () => {
  cantidad.value = Number(cantidad.value) === 0
    ? 0
    : Number(cantidad.value) - 1
});

cantidad.addEventListener('change', () => cantidad.value = Number(cantidad.value) < 0 ? 0 : Number(cantidad.value));


function agregarItem() {
  // traemos el id del producto y la cantidad
  const cantidad = document.querySelector('#cantidad');
  const id = document.querySelector('#id');

  let datos = {   // datos para enviar 
    id: id.value,
    cantidad: Number(cantidad.value)
  };

  // Realiza la solicitud POST usando fetch
  fetch(`/shop/item/${id}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Indica que estás enviando datos en formato JSON
    },
    body: JSON.stringify(datos) // Convierte el objeto a JSON
  })


  
}

