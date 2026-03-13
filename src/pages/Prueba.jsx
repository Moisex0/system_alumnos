import { useState } from "react";

/* COMPONENTE DE PRUEBA PARA VALIDAR LÓGICA LOCAL SIN BASE DE DATOS :) */
export default function Prueba() {
  const [calificaciones, setCalificaciones] = useState([]);
  const [materia, setMateria] = useState("");
  const [calificacion, setCalificacion] = useState("");

  const agregar = () => {
    // Validar que no vaya vacío :)
    if (!materia.trim() || !calificacion.trim()) return;

    const nueva = {
      id: Date.now(),
      materia,
      calificacion,
    };

    setCalificaciones([...calificaciones, nueva]);
    setMateria("");
    setCalificacion("");
  };

  const eliminar = (id) => {
    const nuevaLista = calificaciones.filter(c => c.id !== id);
    setCalificaciones(nuevaLista);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold text-slate-800">CRUD Calificaciones</h1>
          <p className="text-slate-500 text-sm">Entorno de prueba local (No guarda en base de datos)</p>
        </header>

        {/* FORMULARIO PARA AGREGAR DATOS :) */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[150px]">
            <input
              className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm"
              placeholder="Nombre de la materia"
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
            />
          </div>

          <div className="w-32">
            <input
              className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm text-center"
              placeholder="Nota"
              value={calificacion}
              onChange={(e) => setCalificacion(e.target.value)}
            />
          </div>

          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2.5 rounded-lg shadow-md shadow-green-100 transition-all transform active:scale-95 text-sm"
            onClick={agregar}
          >
            Agregar
          </button>
        </div>

        {/* TABLA DE RESULTADOS :) */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-200">
                <th className="p-4 font-bold text-slate-700 text-xs uppercase tracking-wider">Materia</th>
                <th className="p-4 font-bold text-slate-700 text-xs uppercase tracking-wider text-center">Calificación</th>
                <th className="p-4 font-bold text-slate-700 text-xs uppercase tracking-wider text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {calificaciones.length > 0 ? (
                calificaciones.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 text-slate-700 font-medium">{c.materia}</td>
                    <td className="p-4 text-center">
                      <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-bold text-sm">
                        {c.calificacion}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        className="text-red-500 hover:text-red-700 font-bold text-xs uppercase tracking-widest transition-colors"
                        onClick={() => eliminar(c.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-10 text-center text-slate-400 italic">
                    No hay calificaciones en la lista temporal.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}