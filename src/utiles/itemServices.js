const fs = require('fs'); // requerimos fs

const dataPath = './data/products.json'; // definimos ruta al archivo de datos JSON

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
  try { // intentamos escribir el archivo productos.json
    const jsonData = JSON.stringify(data, null, 2); // transformamos la información recibida
    fs.writeFileSync(dataPath, jsonData, 'utf-8');  // escribimos la información en el archivo 
    console.log('Archivo JSON actualizado correctamente.'); // si no hay error mostramos el mensaje 
    return 1;  // devuelve 1 en exito    
  } catch (error) {  // si hay error mostramos el mensaje 
    console.error('Error al escribir en el archivo JSON:', error.message);
    return -1; // devuelve -1 en error
  }
};

const cleanUploads = (file) => {
  file = './public/' + file;
  //if (fs.existsSync(file)) {
    // Borrar el archivo
    fs.unlink(file, (error) => {
      if (error) {
        console.error(`Error al borrar el archivo:  ${file} \n`, error);
        return -1;
      } else {
        console.log('Archivo borrado exitosamente.');
        return 1;
      }
    });
  //}
  // return -1;
}

module.exports = { // exportamos las funciones

  // devuelve todos los productos
  getAllData: () => { 
    const data = readData(); // lee la info
    return data;             // la retorna
  },


  // devuelve un producto, lo busca por número de id
  getDataById: (id) => {
    const data = readData(); // lee la info

    let item = {}; // creamos un objeto vacío 
    
    data.forEach(index => { // recorremos la info leída
      if(index.product_id === parseInt(id)) { // si coincide el id
        item = index;                        // lo guardamos en el objeto creado antes
      }
    });
    console.log(item);    // linea para depuración
    return item;         // devolvemos el producto si se encontró, sino lo devuelve vacío
  
  },
  

  // guarda un producto 
  postData: (req) => { // recibe el require completo
    
      const data = readData(); // lee la info

      // creamos un objeto y le agregamos parte de la información pasada por parametro
      const newProduct = {    
        product_id: data.length + 1,   // el id es = al total de elementos ( objetos en el array[]) + 1     
        licence_name: req.body.licence_name,
        category_name: req.body.category_name,
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price,
        dues: req.body.dues,
        product_sku: req.body.product_sku,
        // se guardan las rutas a los archivos subidos al servidor (si hay, sino se guarda null)
        img_front: req.files.length > 0 ? 'multimedia/upload_img/' + req.files[0].filename : null,  
        img_back: req.files.length > 1 ? 'multimedia/upload_img/' + req.files[1].filename : null
      };

    data.push(newProduct); // agregamos el nuevo producto 
    const result = writeData(data);        // guarda la información
    console.log( 'Datos agregados correctamente :   ', newProduct ); // muestra un mensaje y el producto agregado depurcion
    return result;
  },

  // actualiza un producto
  updateData: (req) => {
    
    const data = readData();  // lee toda la información de productos
    const product_id = req.body.product_id; // guardamos el id del producto a actualizar
    let item = {};    // objeto para guardar la info del producto a actualizar
    
    data.forEach(index => { // recorremos data en busca del producto a actualizar
      if(index.product_id === parseInt(product_id)) { // si lo encontramos
        item = index;   // guardamos la información en item
      }
    });

    // creamos un objeto y guardamos la información 
    const updatedData = {
      product_id: parseInt(product_id),        
      licence_name: req.body.licence_name,
      category_name: req.body.category_name,
      product_name: req.body.product_name,
      product_description: req.body.product_description,
      product_price: req.body.product_price,
      dues: req.body.dues,
      product_sku: req.body.product_sku,

      // se guardan las rutas a los archivos subidos al servidor (si hay, sino se guarda null)
      img_front: req.files.length > 0 ? 'multimedia/upload_img/' + req.files[0].filename : null,  
      img_back: req.files.length > 1 ? 'multimedia/upload_img/' + req.files[1].filename : null
    }; 
    
    if (item != {}) {
      data[parseInt(item.product_id)-1] = updatedData; // actualizamos el producto
      console.log('ID encontrado' );
      if(item.img_front !== null ){
        cleanUploads(item.img_front);
      } 
      if(item.img_back !== null ){
        cleanUploads(item.img_back);
      } 
      return writeData(data);    // guardamos la información actualizada y devolvemos el resultado
    } else {
      console.log('ID no encontrado');
      return -1;
    }
  },

  // borra un producto
  deleteData: (id) => {
    const data = readData(); // traemos la información de productos
    let itemDel = {}; // objeto temporal para guardar el item a borrar
    let newData = []; // creamos un array vacio para guardar la información actualizada
    data.forEach(item => { // recorremos en busca del id del producto
      if(item.product_id !== parseInt(id)) {   // si el id de un producto no coincide con
        item.product_id = newData.length + 1;  // con el producto que queremos eliminar, lo
        newData.push(item);                    // agregamos al array con data actualizada
      } else {
        itemDel = item;
      }
    });

    if (newData.length < data.length) {   // si el tamaño de newData es menor a data filtramos correctamente la info
      console.log('ID encontrado');
      if(itemDel.img_front !== null ){
        cleanUploads('/'+itemDel.img_front);
      } 
      if(itemDel.img_back !== null ){
        cleanUploads('/'+itemDel.img_back);
      } 
      return writeData(newData);    // guardamos la información actualizada y devolvemos el resultado
    } else {
      console.log('ID no encontrado');
      return -1;
    }
  }
};

