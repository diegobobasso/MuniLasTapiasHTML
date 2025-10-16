const multer = require('multer'); // importamos multer para la carga de archivos al servidor
const path = require('path');   


// implementación de multer
const storage = multer.diskStorage({
  // configuramos el directorio donde se van a guardar los archivos subidos
  destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../../public/multimedia/upload_img')),
  // se renombra, se agrega hora de carga para evitar conflictos
  filename: (req, file, cb) => cb(null,Date.now() + '_' + file.originalname)
});

module.exports = multer({storage}); // guardamos multer y la configuración para utilizarlo
