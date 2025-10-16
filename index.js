// requerimos dependencias y modulos externos
const express = require('express');
const cors = require('cors')
const path = require('path');
const session = require('express-session');

const app = express(); // guardamos express en app

const port = 3000; // definimos el puerto del servidor


// transferencia de información entre clientes y servidor
app.use(cors());  
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

app.use(
  session({
    secret: 'las sesiones con un lío!', // Cambia esto a una cadena segura en un entorno de producción
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 5 * 60 * 1000, // 5 minutos
    },
    rolling: true, // La sesión se renovará en cada solicitud, extendiendo el tiempo de expiración
  })
 );

// rutas

const mainRoutes = require('./src/Routes/mainRoutes');
const adminRoutes = require('./src/Routes/adminRoutes');
const shopRoutes = require('./src/Routes/shopRoutes');
const authRoutes = require('./src/Routes/authRoutes');

// ruta para manejo de error 404 pagina no encontrada
const { notFoundPage } = require('./src/error/errorHandlers');

// configuramos la carpeta de elementos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// configuramos nuestro motor de vistas y su carpeta
app.set ('views',path.join(__dirname,'views'));
app.set ('view engine', 'ejs');

// definimos las rutas
app.use('/', mainRoutes);
app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);
app.use('/auth', authRoutes);
app.use(notFoundPage);

// ejecución del servidor
app.listen(port, () => {
  console.log(`Servidor OK en el puerto ${port}`);
});
