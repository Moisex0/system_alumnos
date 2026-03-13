const express = require("express");
const router = express.Router();

/* AQUI SE TRAEN LAS FUNCIONES QUE MANEJAN EL CRUD DE ALUMNOS :) */
const {
  obtenerAlumnos,
  obtenerAlumno,
  insertarAlumno,
  actualizarAlumno,
  actualizarCorreo,
  eliminarAlumno
} = require("../controllers/alumnosController");

/* FUNCION QUE REVISA LOS DATOS DEL LOGIN :) */
const { login } = require("../controllers/loginController");

/* FUNCIONES QUE MANEJAN EL CRUD DE CALIFICACIONES Y PROMEDIOS :) */
const {
  obtenerCalificaciones,
  insertarCalificacion,
  actualizarCalificacion,
  eliminarCalificacion,
  obtenerPromedios
} = require("../controllers/calificacionesController");


/* RUTA PARA INICIAR SESION :) */
router.post("/login", login);


/* RUTAS DEL CRUD DE ALUMNOS :) */

router.get("/alumnos", obtenerAlumnos);

router.get("/alumnos/:id", obtenerAlumno);

router.post("/alumnos", insertarAlumno);

router.put("/alumnos/:id", actualizarAlumno);

router.patch("/alumnos/:id", actualizarCorreo);

router.delete("/alumnos/:id", eliminarAlumno);


/* RUTAS DEL CRUD DE CALIFICACIONES :) */

router.get("/calificaciones", obtenerCalificaciones);

router.post("/calificaciones", insertarCalificacion);

router.put("/calificaciones/:id", actualizarCalificacion);

router.delete("/calificaciones/:id", eliminarCalificacion);


/* RUTA QUE CALCULA LOS PROMEDIOS DE LOS ALUMNOS :) */
router.get("/promedios", obtenerPromedios);


module.exports = router;