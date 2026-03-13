import { Link, useNavigate } from "react-router-dom";

/* ESTE COMPONENTE MUESTRA EL MENÚ PARA MOVERSE ENTRE LAS PÁGINAS :) */
export default function Navbar() {

  const navigate = useNavigate();

  /* BORRA EL USUARIO GUARDADO Y REGRESA AL LOGIN :) */
  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-40">

      <div className="flex items-center gap-2">
        {/* UN PEQUEÑO INDICADOR VISUAL ANTES DEL TÍTULO :) */}
        <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
        <h1 className="font-bold text-xl tracking-tight">
          Sistema Escolar
        </h1>
      </div>

      <div className="flex gap-2 items-center">

        {/* IR A LA PÁGINA DEL CRUD DE ALUMNOS :) */}
        <Link
          to="/alumnos"
          className="hover:bg-slate-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-slate-300 hover:text-white"
        >
          Alumnos
        </Link>

        {/* IR A LA PÁGINA DEL CRUD DE CALIFICACIONES :) */}
        <Link
          to="/calificaciones"
          className="hover:bg-slate-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-slate-300 hover:text-white"
        >
          Calificaciones
        </Link>

        {/* SEPARADOR VISUAL :) */}
        <div className="w-px h-6 bg-slate-700 mx-2"></div>

        {/* BOTÓN PARA SALIR DEL SISTEMA CON ESTILO MÁS LIMPIO :) */}
        <button
          onClick={cerrarSesion}
          className="bg-transparent border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-500 hover:text-white transition-all duration-200"
        >
          Cerrar sesión
        </button>

      </div>

    </nav>
  );
}