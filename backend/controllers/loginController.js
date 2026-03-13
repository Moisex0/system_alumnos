const db = require("../models/connection");

/* REVISA SI EL CORREO Y PASSWORD EXISTEN PARA PERMITIR ENTRAR AL SISTEMA :) */
function login(req, res) {

  const { correo, password } = req.body;

  const query = "SELECT * FROM usuarios WHERE correo=$1 AND password=$2";

  db.query(query, [correo, password], (err, result) => {

    if (err) {
      console.error(err);
      return res.status(500).json({ success: false });
    }

    /* SI ENCUENTRA EL USUARIO SE DEVUELVEN SUS DATOS :) */
    if (result.rows.length > 0) {

      const usuario = result.rows[0];

      res.json({
        success: true,
        usuario: {
          id: usuario.id,
          correo: usuario.correo
        }
      });

    } else {

      /* SI NO EXISTE EL USUARIO NO SE PERMITE ENTRAR :) */
      res.json({ success: false });

    }

  });

}

module.exports = { login };