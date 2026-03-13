const db = require('../models/connection');

/* OBTIENE TODOS LOS ALUMNOS QUE PERTENECEN AL USUARIO QUE INICIO SESION :) */
function obtenerAlumnos(req, res){
    try {
        const { usuario_id } = req.query;
        const query = "SELECT * FROM alumnos WHERE usuario_id = $1";

        db.query(query, [usuario_id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error en el servidor :(");
            }
            res.json(result.rows);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error en el servidor");
    }
}

/* BUSCA UN SOLO ALUMNO USANDO SU ID :) */
function obtenerAlumno(req, res){
    const { id } = req.params;
    const query = "SELECT * FROM alumnos WHERE id = $1";

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error en el servidor :(");
        }
        res.json(result.rows);
    });
}

/* GUARDA UN NUEVO ALUMNO EN LA BASE DE DATOS :) */
function insertarAlumno(req, res){
    try {
        const { nombre, grado, grupo, correo, usuario_id } = req.body;

        /* REVISA QUE NO FALTEN DATOS ANTES DE GUARDAR :) */
        if(!nombre || !grado || !grupo || !correo){
            return res.status(400).send("Faltan datos para insertar alumno");
        }

        const query = `
        INSERT INTO alumnos(nombre, grado, grupo, correo, usuario_id)
        VALUES ($1,$2,$3,$4,$5)
        `;

        db.query(query, [nombre, grado, grupo, correo, usuario_id], (err, result)=>{
            if(err){
                console.error(err);
                return res.status(500).send("Error al insertar");
            }
            res.send("Alumno insertado :)");
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al insertar");
    }
}

/* CAMBIA LOS DATOS DE UN ALUMNO QUE YA EXISTE :) */
function actualizarAlumno(req, res){
    try {
        const { id } = req.params;
        const { nombre, grado, grupo, correo } = req.body;

        const query = `
        UPDATE alumnos
        SET nombre=$1, grado=$2, grupo=$3, correo=$4
        WHERE id=$5
        `;

        db.query(query, [nombre, grado, grupo, correo, id], (err, result)=>{
            if(err){
                console.error(err);
                return res.status(500).send("Error al actualizar");
            }
            res.send("Alumno actualizado :)");
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al actualizar");
    }
}

/* ACTUALIZA SOLO EL CORREO DEL ALUMNO :) */
function actualizarCorreo(req, res){
    try {
        const { id } = req.params;
        const { correo } = req.body;
        const query = "UPDATE alumnos SET correo=$1 WHERE id=$2";

        db.query(query, [correo, id], (err, result)=>{
            if(err){
                console.error(err);
                return res.status(500).send("Error al actualizar campo");
            }
            res.send("Correo actualizado :)");
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al actualizar campo");
    }
}

/* ELIMINA UN ALUMNO USANDO SU ID :) */
function eliminarAlumno(req, res){
    try {
        const { id } = req.params;
        const query = "DELETE FROM alumnos WHERE id=$1";

        db.query(query, [id], (err, result)=>{
            if(err){
                console.error(err);
                return res.status(500).send("Error al eliminar");
            }
            res.send("Alumno eliminado :(");
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al eliminar");
    }
}

module.exports = { obtenerAlumnos, obtenerAlumno, insertarAlumno, actualizarAlumno, actualizarCorreo, eliminarAlumno };