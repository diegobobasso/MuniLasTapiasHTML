const express = require('express'); 
const router = express.Router(); // Usamos Router de express
const uploadFiles = require('../utiles/uploadServices');

// Definimos e importamos los controladores para cada ruta

const {
  adminView,
  adminFind,
  createView,
  createItem,
  editView,
  editUpdate,
  deleteView,
  deleteItem,
} = require('../Controllers/adminController');

const { isAdmin } = require('../utiles/authServices');

router.get('/', isAdmin, adminView);
router.post('/', isAdmin, adminFind);
router.get('/create', isAdmin, createView);
router.post('/create', isAdmin, uploadFiles.array('files', 2), createItem);  // agregamos el middleware para 
                                                                  // subir los archivos ( 2 maximo)
router.get('/edit/:id', isAdmin,editView);
router.post('/edit/:id', isAdmin, uploadFiles.array('files', 2), editUpdate);
router.get('/delete/:id', isAdmin, deleteView);
router.post('/delete/:id', isAdmin, deleteItem);
 
// Exportamos la ruta

module.exports = router;
