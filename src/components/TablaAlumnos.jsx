/* ESTE COMPONENTE MUESTRA LA TABLA DE ALUMNOS Y PERMITE EDITAR O ELIMINAR :) */
export default function TablaAlumnos({
  alumnos,
  editando,
  nuevoNombre,
  nuevoGrado,
  nuevoGrupo,
  nuevoCorreo,
  setNuevoNombre,
  setNuevoGrado,
  setNuevoGrupo,
  setNuevoCorreo,
  actualizarAlumno,
  setEditando,
  editarAlumno,
  eliminarAlumno
}) {

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-left border-collapse bg-white text-sm">

        <thead>
          <tr className="bg-slate-50 border-b border-gray-200">
            <th className="p-4 font-semibold text-slate-700">Nombre</th>
            <th className="p-4 font-semibold text-slate-700">Grado</th>
            <th className="p-4 font-semibold text-slate-700">Grupo</th>
            <th className="p-4 font-semibold text-slate-700">Correo</th>
            <th className="p-4 font-semibold text-center text-slate-700">Acciones</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">

          {/* RECORRE TODOS LOS ALUMNOS PARA MOSTRARLOS EN LA TABLA :) */}
          {alumnos.map((a) => (

            <tr key={a.id} className="hover:bg-slate-50 transition-colors">

              {/* SI EL ID COINCIDE SIGNIFICA QUE ESA FILA ESTA EN MODO EDICION :) */}
              {editando === a.id ? (

                <>
                  <td className="p-3">
                    <input className="border border-blue-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-100 outline-none" value={nuevoNombre} onChange={(e)=>setNuevoNombre(e.target.value)} />
                  </td>

                  <td className="p-3">
                    <input className="border border-blue-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-100 outline-none" value={nuevoGrado} onChange={(e)=>setNuevoGrado(e.target.value)} />
                  </td>

                  <td className="p-3">
                    <input className="border border-blue-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-100 outline-none" value={nuevoGrupo} onChange={(e)=>setNuevoGrupo(e.target.value)} />
                  </td>

                  <td className="p-3">
                    <input className="border border-blue-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-100 outline-none" value={nuevoCorreo} onChange={(e)=>setNuevoCorreo(e.target.value)} />
                  </td>

                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      {/* GUARDA LOS CAMBIOS DEL ALUMNO :) */}
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                        onClick={()=>actualizarAlumno(a.id)}
                      >
                        Guardar
                      </button>

                      {/* SALE DEL MODO EDICION :) */}
                      <button
                        className="bg-slate-400 hover:bg-slate-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                        onClick={()=>setEditando(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </td>
                </>

              ) : (

                <>
                  <td className="p-4 text-slate-700 font-medium">{a.nombre}</td>
                  <td className="p-4 text-slate-600">{a.grado}</td>
                  <td className="p-4 text-slate-600">{a.grupo}</td>
                  <td className="p-4 text-slate-600">{a.correo}</td>

                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-3">
                      {/* ACTIVA EL MODO EDICION PARA ESTA FILA :) */}
                      <button
                        className="text-amber-600 hover:text-amber-700 text-xs font-bold uppercase tracking-wider transition-colors"
                        onClick={()=>editarAlumno(a)}
                      >
                        Editar
                      </button>

                      {/* ELIMINA EL ALUMNO :) */}
                      <button
                        className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-wider transition-colors"
                        onClick={()=>eliminarAlumno(a.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </>

              )}

            </tr>

          ))}

          {/* MENSAJE SI NO HAY DATOS :) */}
          {alumnos.length === 0 && (
            <tr>
              <td colSpan="5" className="p-8 text-center text-slate-400 italic bg-slate-50/50">
                No hay registros de alumnos para mostrar.
              </td>
            </tr>
          )}

        </tbody>

      </table>
    </div>
  );
}