const fs = require('fs'); // requerimos fs

const dataPath = './data/carts.json'; // definimos ruta al archivo de datos JSON

// función de lectura de archivo JSON
const readData = () => {
  try { // intentamos leer el archivo productos.json
    return JSON.parse(fs.readFileSync(dataPath, 'utf-8')); // transformamos a formato JSON la 
                                                          // leida con fs.readFileSync (lectura sincrónica)
  } catch (error) { // si hay error lo mostramos y retornamos un array vacío
    console.error('Error al leer el archivo JSON:', error.message);
    return [];
  }
};

// función de escritura de archivo JSON 
const writeData = (data) => { // data: información a guardar en el archivo
  try { // intentamos escribir el archivo json
    const jsonData = JSON.stringify(data, null, 2); // transformamos la información recibida
    fs.writeFileSync(dataPath, jsonData, 'utf-8');  // escribimos la información en el archivo 
    console.log('Archivo JSON actualizado correctamente.'); // si no hay error mostramos el mensaje 
    return 1;  // devuelve 1 en exito    
  } catch (error) {  // si hay error mostramos el mensaje 
    console.error('Error al escribir en el archivo JSON:', error.message);
    return -1; // devuelve -1 en error
  }
};

module.exports = { // exportamos las funciones

  // devuelve todos los carritos
  getAllData: () => { 
    const data = readData(); // lee la info
    return data;             // la retorna
  },


  // devuelve un carrito, lo busca por email
  getDataByEmail: (email) => {
    const data = readData(); // lee la info

    let cart = {}; // creamos un objeto vacío 
    
    data.forEach(index => { // recorremos la info leída
      if(index.email == email) { // si coincide el email
        cart = index;            // lo guardamos en el objeto creado antes
      }
    });
    console.log( 'carrito:    ' + cart.email);    // linea para depuración
    return cart;         // devolvemos el carrito si se encontró, sino lo devuelve vacío
  
  },
  
  // crea un carrito
  postNewCart: (email) => { // recibe el require completo
    
      const data = readData(); // lee la info

      // creamos un objeto y le agregamos parte de la información pasada por parametro
      const newCart = {    
        cart_id: data.length + 1,   // el id es = al total de elementos ( objetos en el array[]) + 1     
        email: email,
        productos: []
        };

    data.push(newCart); // agregamos el nuevo carrito 
    const result = writeData(data);        // guarda la información
    console.log( 'Datos agregados correctamente :   ', newCart ); // muestra un mensaje y el carrito agregado depurcion
    return result;
  },

  // agrega un producto al carrito
  addItem: (email, producto) => {
    const data = readData();
    let result = 0;
    
    data.forEach(index => { // busca el carrito asociado al mail que inicia sesión
      if(index.email == email) {   // si encuentra el carrito
        for(let i = 0; i < index.productos.length; i++) {  // buscamos en los productos si ya esta cargado
          if(index.productos[i].item.product_sku === producto.item.product_sku) {   // si el codigo de un producto coincide
            index.productos[i].cantidad = Number(index.productos[i].cantidad) + Number(producto.cantidad)     // actualiza la cantidad
            result = 1;
          }
        }; 
        if(result == 0) {
          index.productos.push(producto); // si no lo encontró antes, lo agrega
          result = 1; 
        }
      } 
    });
        
    if (result == 1) {
      console.log(`Item ${producto} añadido en carrito ${email} .` );
      return writeData(data);    // guardamos la información actualizada y devolvemos el resultado
      } else {
      console.log('Carrito no encontrado');
      return -1;
    }
  },

 // actualiza un carrito (todos los productos)
 updateCart: (email, productos) => {
    
  const data = readData();  // lee toda la información de carritos
  let result = 0;
  data.forEach(index => { // recorremos data en busca del carrito a actualizar
    if(index.email.toString() == email.toString()) { // si lo encontramos
       index.productos = productos;   // guardamos la información actualizada
       result = 1;   
    }
  });
  
  if (result > 0) {
    console.log(`Carrito ${email} actualizado` );
    return writeData(data);    // guardamos la información actualizada y devolvemos el resultado
  } else {
    console.log('Carrito no encontrado');
    return -1;
  }
},
 
  // actualiza un carrito (solo cantidad de un producto)
  updateCartItem: (email, product_sku, cantidad) => {
    
    const data = readData();  // lee toda la información de carritos
    let result = 0;
    
    data.forEach(index => { // recorremos en busca del email
      if(index.email == email) {   // si encuentra el carrito
        for(let i = 0; i < index.productos.length; i++) {
          if(index.productos[i].item.product_sku === product_sku) {   // si el codigo de un producto no coincide lo
            index.productos[i].cantidad = cantidad     // actualiza la cantidad
          }
        };
        result = 1;
      }
    });

    if (result > 0) {
      console.log(`Carrito ${email} actualizado` );
      return writeData(data);    // guardamos la información actualizada y devolvemos el resultado
    } else {
      console.log('Carrito no encontrado');
      return -1;
    }
  },

  // borra un producto de un carrito
  deleteData: (email, producto) => {
    const data = readData(); // traemos la información de carritos
    let result = 0;

    data.forEach(index => { // recorremos en busca del email
      if(index.email == email) {   // si encuentra el carrito
        let newData = []; // creamos un array vacio para guardar la información actualizada
        for(let i = 0; i < index.productos.length; i++) {
          if(index.productos[i].item.product_sku !== producto) {   // si el codigo de un producto no coincide lo
            newData.push(index.productos[i]);                    // agregamos al array con data actualizada
          }
        };
        index.productos = newData; // guardamos la información actualizada
        result = 1;
      }
    });

    if (result == 1 ) {   // si pudo vaciar el carrito
      console.log(`Carrito ${email} actualizado.`);
      return writeData(data);    // guardamos la información actualizada y devolvemos el resultado
    } else {
      console.log('Carrito no encontrado');
      return -1;
    }
  },

  // vacía un carrito
  emptyCart: (email) => {
    const data = readData(); // traemos la información de carritos
    let result = 0;

    data.forEach(index => { // recorremos en busca del email
      if(index.email == email) {   // si encuentra el carrito
        index.productos = [];  // vacía el array de productos
        result = 1;
      }
    });

    if (result == 1 ) {   // si pudo vaciar el carrito
      console.log(`Carrito ${email} vacío.`);
      return writeData(data);    // guardamos la información actualizada y devolvemos el resultado
    } else {
      console.log('Carrito no encontrado');
      return -1;
    }
  }
};

