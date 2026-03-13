/* ESTE COMPONENTE MUESTRA MENSAJES DE ERROR O EXITO EN LA PANTALLA :) */
export default function Alerta({ mensaje, tipo }) {

  /* SI NO HAY MENSAJE NO SE MUESTRA NADA :) */
  if (!mensaje) return null;

  return (
    <div
      className={`p-4 mb-4 rounded-lg border-l-4 shadow-sm font-medium transition-all duration-300 ${
        /* CAMBIA EL COLOR DEPENDIENDO SI ES ERROR O MENSAJE CORRECTO :) */
        tipo === "error" 
          ? "bg-red-50 border-red-500 text-red-800" 
          : "bg-green-50 border-green-500 text-green-800"
      }`}
    >
      <div className="flex items-center">
        {/* REEMPLAZAMOS EL EMOJI CON UN PEQUEÑO INDICADOR DE TEXTO O PUNTO SI FUERA NECESARIO, 
            PERO POR AHORA SOLO EL TEXTO BIEN ALINEADO :) */}
        <span className="text-sm">
          {mensaje}
        </span>
      </div>
    </div>
  );
}