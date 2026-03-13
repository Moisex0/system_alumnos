/* ESTE COMPONENTE MUESTRA UNA VENTANA PARA CONFIRMAR UNA ACCIÓN COMO ELIMINAR :) */
export default function Modal({ mensaje, onConfirmar, onCancelar }) {

  return (
    /* FONDO OSCURO CON DESENFOQUE QUE CUBRE TODA LA PANTALLA :) */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">

      {/* CAJA DEL MENSAJE QUE APARECE AL CENTRO CON BORDES REDONDEADOS :) */}
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm text-center transform transition-all border border-gray-200">
        
        <div className="mb-4">
          <span className="text-red-500 font-bold tracking-widest uppercase text-xs">
            Atención
          </span>
        </div>

        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          {mensaje}
        </h2>

        {/* BOTONES PARA CONFIRMAR O CANCELAR CON EFECTO HOVER :) */}
        <div className="flex justify-center gap-3">

          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-2 rounded-lg transition-colors w-full"
            onClick={onCancelar}
          >
            Cancelar
          </button>

          <button
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg shadow-sm transition-colors w-full"
            onClick={onConfirmar}
          >
            Confirmar
          </button>

        </div>

      </div>

    </div>
  );
}