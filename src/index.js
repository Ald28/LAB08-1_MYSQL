import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import ventaRoutes from './routes/venta.routes.js'
import laboratorioRoutes from './routes/laboratorio.routes.js'

// Para obtener el directorio actual (__dirname) en módulos ESM:
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// Configura el puerto
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));

// Configurar motor de plantilla
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.render('index');
});

// Archivos estáticos
app.use(express.static(join(__dirname, 'public')));

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});

app.use(ventaRoutes)
app.use(laboratorioRoutes)