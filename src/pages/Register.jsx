import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";

export default function Register() {

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("");

  const navigate = useNavigate();

  /* DIRECCIÓN DEL BACKEND PARA HACER LA PETICIÓN :) */
  const API = "http://localhost:3000";

  /* ESTA FUNCIÓN ENVÍA LOS DATOS PARA CREAR UN NUEVO USUARIO :) */
  const registrar = async () => {

    /* VALIDAR QUE LOS CAMPOS NO ESTÉN VACÍOS :) */
    if (!correo || !password) {
      setMensaje("Llena todos los campos");
      setTipo("error");
      return;
    }

    try {
      const res = await axios.post(`${API}/register`, {
        correo,
        password
      });

      /* SI EL USUARIO SE CREA CORRECTAMENTE SE REGRESA AL LOGIN :) */
      if (res.data.success) {
        setMensaje("Cuenta creada. Redirigiendo al login...");
        setTipo("success");

        setTimeout(() => {
          navigate("/");
        }, 1500);

      } else {
        setMensaje(res.data.mensaje || "Error al registrar");
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
          <div className="inline-block p-3 rounded-xl bg-green-50 text-green-600 mb-4">
            {/* UN INDICADOR VISUAL DE "USER/PLUS" SIN EMOJIS :) */}
            <div className="w-8 h-8 flex items-center justify-center">
               <div className="w-6 h-6 border-4 border-green-600 rounded-full relative after:content-[''] after:absolute after:w-8 after:h-4 after:border-4 after:border-green-600 after:border-b-0 after:rounded-t-full after:top-6 after:left-1/2 after:-translate-x-1/2"></div>
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800">
            Crear Cuenta
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Únete al sistema escolar hoy mismo
          </p>
        </div>

        <Alerta mensaje={mensaje} tipo={tipo} />

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Correo Electrónico</label>
            <input
              className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm"
              placeholder="correo@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Contraseña</label>
            <input
              className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-100 transition-all transform active:scale-[0.98] mt-2"
            onClick={registrar}
          >
            Registrarme
          </button>
        </div>

        {/* ENLACE PARA VOLVER AL LOGIN :) */}
        <p className="text-center mt-8 text-slate-600 font-medium text-sm">
          ¿Ya tienes una cuenta?{" "}
          <button
            className="text-blue-600 font-bold hover:underline underline-offset-4 decoration-2"
            onClick={() => navigate("/")}
          >
            Inicia sesión aquí
          </button>
        </p>

      </div>

    </div>
  );
}