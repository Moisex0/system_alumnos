import Alerta from "../components/Alerta";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("");

  const navigate = useNavigate();

  /* DIRECCION DEL BACKEND PARA HACER LAS PETICIONES :) */
  const API = "http://localhost:3000";

  /* ESTA FUNCION REVISA LOS DATOS Y MANDA LA PETICION AL BACKEND :) */
  const iniciarSesion = async () => {

    /* VALIDAR QUE LOS CAMPOS NO ESTEN VACIOS :) */
    if (!correo || !password) {
      setMensaje("Llena todos los campos");
      setTipo("error");
      return;
    }

    try {
      const res = await axios.post(`${API}/login`, {
        correo,
        password
      });

      /* SI EL LOGIN ES CORRECTO SE GUARDA EL USUARIO Y SE ENTRA AL SISTEMA :) */
      if (res.data.success) {
        setMensaje("Bienvenido al sistema");
        setTipo("success");

        /* GUARDAR EL USUARIO EN EL NAVEGADOR PARA MANTENER LA SESION :) */
        localStorage.setItem("usuario", JSON.stringify(res.data.usuario));

        setTimeout(() => {
          navigate("/alumnos");
        }, 1000);

      } else {
        setMensaje("Datos incorrectos");
        setTipo("error");
      }

    } catch (error) {
      console.log(error);
      setMensaje("Error en el servidor");
      setTipo("error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">

        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-xl bg-blue-50 text-blue-600 mb-4">
            {/* UN INDICADOR VISUAL DE "LOCK/BLOQUEO" SIN EMOJIS :) */}
            <div className="w-8 h-8 border-4 border-blue-600 rounded-md relative after:content-[''] after:absolute after:w-4 after:h-4 after:border-4 after:border-blue-600 after:border-b-0 after:rounded-t-full after:-top-5 after:left-1/2 after:-translate-x-1/2"></div>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800">
            Bienvenido
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <Alerta mensaje={mensaje} tipo={tipo} />

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Correo Electrónico</label>
            <input
              className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="nombre@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Contraseña</label>
            <input
              className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-[0.98] mt-2"
            onClick={iniciarSesion}
          >
            Iniciar Sesión
          </button>
        </div>

        {/* ENLACE PARA IR A LA PAGINA DE REGISTRO :) */}
        <p className="text-center mt-8 text-slate-600 font-medium">
          ¿No tienes cuenta?{" "}
          <button
            className="text-blue-600 font-bold hover:underline underline-offset-4 decoration-2"
            onClick={() => navigate("/register")}
          >
            Regístrate gratis
          </button>
        </p>

      </div>

    </div>
  );
}