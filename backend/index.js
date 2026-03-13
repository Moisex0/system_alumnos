const express = require("express");
const cors = require("cors");
const pool = require("./models/connection");

/* IMPORTAR LAS RUTAS DONDE ESTA EL CRUD DE ALUMNOS Y CALIFICACIONES :) */
const alumnosRoutes = require("./routes/routes");

const app = express();

/* PERMITIR QUE EL FRONTEND SE PUEDA COMUNICAR CON ESTE SERVIDOR :) */
app.use(cors());

/* PERMITE RECIBIR DATOS EN FORMATO JSON DESDE EL FRONTEND :) */
app.use(express.json());

/* USAR LAS RUTAS QUE CONTIENEN LAS OPERACIONES DEL CRUD :) */
app.use("/", alumnosRoutes);

/* RUTA SIMPLE SOLO PARA COMPROBAR QUE EL BACKEND ESTA FUNCIONANDO :) */
app.get("/", (req, res) => {
  res.json({ mensaje: "Hola desde el backend :)" });
});

/* AQUI SE REVISA SI EL CORREO Y PASSWORD EXISTEN PARA PERMITIR ENTRAR :) */
app.post("/login", async (req, res) => {
  const { correo, password } = req.body;

  try {
    const query = "SELECT * FROM usuarios WHERE correo = $1 AND password = $2";
    const result = await pool.query(query, [correo, password]);

    if (result.rows.length > 0) {
      res.json({
        success: true,
        usuario: result.rows[0]
      });
    } else {
      res.json({
        success: false,
        mensaje: "Datos incorrectos"
      });
    }
  } catch (error) {
    console.log(error);
    /* SI ALGO FALLA EN LA CONSULTA SE ENVIA ESTE MENSAJE :) */
    res.status(500).json({
      success: false,
      mensaje: "Error en el servidor"
    });
  }
});

/* AQUI SE CREA UN NUEVO USUARIO PARA PODER INICIAR SESION DESPUES :) */
app.post("/register", async (req, res) => {
  const { correo, password } = req.body;

  try {
    /* PRIMERO SE REVISA SI YA EXISTE UN USUARIO CON ESE CORREO :) */
    const checkUser = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo]
    );

    if (checkUser.rows.length > 0) {
      return res.json({
        success: false,
        mensaje: "El usuario ya existe"
      });
    }

    /* SI NO EXISTE ENTONCES SE GUARDA EL NUEVO USUARIO :) */
    const query = `
      INSERT INTO usuarios (correo, password)
      VALUES ($1, $2)
      RETURNING *
    `;

    const result = await pool.query(query, [correo, password]);

    res.json({
      success: true,
      usuario: result.rows[0]
    });
  } catch (error) {
    console.log(error);
    /* SI FALLA EL REGISTRO SE ENVIA ESTE MENSAJE :) */
    res.status(500).json({
      success: false,
      mensaje: "Error al registrar usuario"
    });
  }
});

/* AQUI SE INICIA EL SERVIDOR PARA QUE EL BACKEND EMPIECE A ESCUCHAR PETICIONES :) */
app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});