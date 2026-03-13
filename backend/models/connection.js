const { Pool } = require("pg");

/* CARGA LAS VARIABLES DEL ARCHIVO .ENV PARA USARLAS EN LA CONEXION :) */
require("dotenv").config();

/* AQUI SE CREA LA CONEXION A LA BASE DE DATOS USANDO LOS DATOS DEL .ENV :) */
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

/* EXPORTAR LA CONEXION PARA PODER USARLA EN LOS CONTROLLERS :) */
module.exports = pool;