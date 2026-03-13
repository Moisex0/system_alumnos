const db = require("../models/connection");

/* TRAE LAS CALIFICACIONES JUNTO CON EL NOMBRE DEL ALUMNO :) */
const obtenerCalificaciones = async (req, res) => {
  const { usuario_id } = req.query;
  try {
    const result = await db.query(`
      SELECT c.id, c.alumno_id, a.nombre as alumno, c.materia, c.calificacion
      FROM calificaciones c
      JOIN alumnos a ON c.alumno_id = a.id
      WHERE a.usuario_id = $1
    `, [usuario_id]);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener calificaciones" });
  }
};

/* GUARDA UNA NUEVA CALIFICACION PARA UN ALUMNO :) */
const insertarCalificacion = async (req, res) => {
  const { alumno_id, materia, calificacion } = req.body;
  try {
    await db.query(
      "INSERT INTO calificaciones (alumno_id, materia, calificacion) VALUES ($1,$2,$3)",
      [alumno_id, materia, calificacion]
    );
    res.json({ mensaje: "Calificación registrada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al insertar" });
  }
};

/* CAMBIA LOS DATOS DE UNA CALIFICACION :) */
const actualizarCalificacion = async (req, res) => {
  const { id } = req.params;
  const { alumno_id, materia, calificacion } = req.body;
  try {
    await db.query(
      "UPDATE calificaciones SET alumno_id=$1, materia=$2, calificacion=$3 WHERE id=$4",
      [alumno_id, materia, calificacion, id]
    );
    res.json({ mensaje: "Calificación actualizada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al actualizar" });
  }
};

/* CALCULA EL PROMEDIO DE CALIFICACIONES POR CADA ALUMNO :) */
const obtenerPromedios = async (req, res) => {
  const { usuario_id } = req.query;
  try {
    const result = await db.query(`
      SELECT a.nombre, AVG(c.calificacion) AS promedio
      FROM calificaciones c
      JOIN alumnos a ON c.alumno_id = a.id
      WHERE a.usuario_id = $1
      GROUP BY a.nombre
    `, [usuario_id]);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener promedios" });
  }
};

/* BORRA UNA CALIFICACION USANDO SU ID :) */
const eliminarCalificacion = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM calificaciones WHERE id=$1", [id]);
    res.json({ mensaje: "Calificación eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al eliminar" });
  }
};

module.exports = { obtenerCalificaciones, insertarCalificacion, actualizarCalificacion, obtenerPromedios, eliminarCalificacion };