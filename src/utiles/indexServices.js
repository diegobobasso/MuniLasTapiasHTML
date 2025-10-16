const fs = require('fs'); // requerimos fs

const dataPath = './data/novedades.json'; // definimos ruta al archivo de datos JSON

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


module.exports = { // exportamos las funciones

  // devuelve todos los productos
  getAllData: () => { 
    const data = readData(); // lee la info
    return data;             // la retorna
  },

};

