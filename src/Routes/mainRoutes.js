const express = require('express'); 
const router = express.Router();    // Usamos Router de express

// Definimos rutas e importamos los controladores para cada ruta

const {mainController, aboutController, faqsController} = require('../Controllers/mainController');
const { enviaCorreo, contact } = require('../Controllers/contactController');

router.get('/', mainController);
// router.get('/contact', contact);
// router.post('/enviarcorreo', enviaCorreo);
// router.get('/about', aboutController);
// router.get('/faqs', faqsController);

// Exportamos la ruta
 
module.exports = router; 