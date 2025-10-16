const express = require('express');
const router = express.Router(); // Usamos Router de express

// Definimos rutas e importamos los controladores para cada ruta

const {loginView, loginUser, registerView, registerUser, logout} = require('../Controllers/authController');

router.get('/login', loginView);
router.post('/login', loginUser);
router.get('/register', registerView); 
router.post('/register', registerUser);
router.get('/logout', logout);

// exportamos las rutas

module.exports = router;
