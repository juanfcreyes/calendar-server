import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import auth from './routes/auth';
import events from './routes/events';
import { dbConnection } from './database/config';
import fs from 'fs';

dotenv.config();

/**
 * Crear servidor express;
 */
const app = express();

/**
 * Conenction con Bases de datos
 */
dbConnection();


/**
 * Cors
 */
app.use(cors());

/**
 * Lectura y parseo json
 */
app.use(express.json());

/**
 * configuracion de rutas
 */
app.use('/api/auth', auth);
app.use('/api/events', events);

/**
 * Directorio public
 */
app.use('/app', express.static(__dirname + '/public/'));
console.log('__dirname', __dirname);

/**
 * Configurando servidor
 */
app.listen(process.env.PORT, () => {
    console.log(`Server runs on port: ${process.env.PORT}`);
});


fs.readdir(__dirname + '/public/css', function (err, files) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(files);
});
