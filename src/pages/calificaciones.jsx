import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Alerta from "../components/Alerta";
import Modal from "../components/Modal";

export default function Calificaciones() {
  // ESTADOS DONDE SE GUARDAN LAS CALIFICACIONES, ALUMNOS Y PROMEDIOS :)
  const [calificaciones, setCalificaciones] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [promedios, setPromedios] = useState([]);

  // ESTADOS PARA EL FORMULARIO DE AGREGAR CALIFICACIÓN :)
  const [alumnoId, setAlumnoId] = useState("");
  const [materia, setMateria] = useState("");
  const [calificacion, setCalificacion] = useState("");

  // ESTADOS PARA EDITAR UNA CALIFICACIÓN :)
  const [editando, setEditando] = useState(null);
  const [nuevoAlumnoId, setNuevoAlumnoId] = useState("");
  const [nuevaMateria, setNuevaMateria] = useState("");
  const [nuevaCalificacion, setNuevaCalificacion] = useState("");

  // ESTADOS PARA MOSTRAR MENSAJES AL USUARIO :)
  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("");

  // ESTADOS PARA CONTROLAR EL MODAL DE CONFIRMACIÓN :)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [calificacionEliminar, setCalificacionEliminar] = useState(null);

  const API = "http://localhost:3000";

  useEffect(() => {
    obtenerCalificaciones();
    obtenerAlumnos();
    obtenerPromedios();
  }, []);

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        setMensaje("");
        setTipo("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  const obtenerCalificaciones = async () => {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      const res = await axios.get(`${API}/calificaciones?usuario_id=${usuario.id}`);
      setCalificaciones(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerAlumnos = async () => {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (!usuario) return;
      const res = await axios.get(`${API}/alumnos?usuario_id=${usuario.id}`);
      setAlumnos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerPromedios = async () => {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      const res = await axios.get(`${API}/promedios?usuario_id=${usuario.id}`);
      setPromedios(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const agregarCalificacion = async () => {
    if (!alumnoId || !materia || !calificacion) {
      setMensaje("Llena todos los campos");
      setTipo("error");
      return;
    }
    try {
      await axios.post(`${API}/calificaciones`, {
        alumno_id: alumnoId,
        materia,
        calificacion
      });
      setMensaje("Calificación agregada correctamente");
      setTipo("success");
      setAlumnoId(""); setMateria(""); setCalificacion("");
      obtenerCalificaciones(); obtenerPromedios();
    } catch (error) {
      setMensaje("Error al agregar");
      setTipo("error");
    }
  };

  const abrirConfirmacion = (id) => {
    setCalificacionEliminar(id);
    setMostrarConfirmacion(true);
  };

  const confirmarEliminar = async () => {
    try {
      await axios.delete(`${API}/calificaciones/${calificacionEliminar}`);
      setMensaje("Registro eliminado");
      setTipo("success");
      setMostrarConfirmacion(false);
      obtenerCalificaciones(); obtenerPromedios();
    } catch (error) {
      setMensaje("Error al eliminar");
      setTipo("error");
    }
  };

  const editarCalificacion = (c) => {
    setEditando(c.id);
    setNuevoAlumnoId(c.alumno_id);
    setNuevaMateria(c.materia);
    setNuevaCalificacion(c.calificacion);
  };

  const actualizarCalificacion = async (id) => {
    try {
      await axios.put(`${API}/calificaciones/${id}`, {
        alumno_id: nuevoAlumnoId,
        materia: nuevaMateria,
        calificacion: nuevaCalificacion
      });
      setEditando(null);
      setMensaje("Cambios guardados");
      setTipo("success");
      obtenerCalificaciones(); obtenerPromedios();
    } catch (error) {
      setMensaje("Error al actualizar");
      setTipo("error");
    }
  };

  // AGRUPAR CALIFICACIONES POR ALUMNO :)
  const calificacionesAgrupadas = calificaciones.reduce((acc, c) => {
    if (!acc[c.alumno]) acc[c.alumno] = [];
    acc[c.alumno].push(c);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800">Gestión de Calificaciones</h1>
          <p className="text-slate-500">Administra las notas y consulta los promedios finales.</p>
        </header>

        <Alerta mensaje={mensaje} tipo={tipo} />

        {/* FORMULARIO DE REGISTRO :) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10 flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Alumno</label>
            <select className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={alumnoId} onChange={(e) => setAlumnoId(e.target.value)}>
              <option value="">Seleccionar alumno...</option>
              {alumnos.map((a) => (<option key={a.id} value={a.id}>{a.nombre}</option>))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Materia</label>
            <input className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Ej: Matemáticas" value={materia} onChange={(e) => setMateria(e.target.value)} />
          </div>

          <div className="w-32">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Nota</label>
            <input className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-center" placeholder="0-10" value={calificacion} onChange={(e) => setCalificacion(e.target.value)} />
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-lg shadow-md shadow-blue-200 transition-all" onClick={agregarCalificacion}>
            Registrar
          </button>
        </div>

        {/* TABLA PRINCIPAL :) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-12">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-200">
                <th className="p-4 font-bold text-slate-700 uppercase text-xs tracking-wider">Alumno</th>
                <th className="p-4 font-bold text-slate-700 uppercase text-xs tracking-wider">Materia</th>
                <th className="p-4 font-bold text-slate-700 uppercase text-xs tracking-wider text-center">Nota</th>
                <th className="p-4 font-bold text-slate-700 uppercase text-xs tracking-wider text-center">Estado</th>
                <th className="p-4 font-bold text-slate-700 uppercase text-xs tracking-wider text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Object.keys(calificacionesAgrupadas).map((alumno) => (
                calificacionesAgrupadas[alumno].map((c, index) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    {index === 0 && (
                      <td className="p-4 font-bold text-slate-800 bg-white" rowSpan={calificacionesAgrupadas[alumno].length}>
                        {alumno}
                      </td>
                    )}
                    <td className="p-4">
                      {editando === c.id ? (
                        <input className="border border-blue-300 rounded px-2 py-1 w-full outline-none focus:ring-2 focus:ring-blue-100" value={nuevaMateria} onChange={(e) => setNuevaMateria(e.target.value)} />
                      ) : (c.materia)}
                    </td>
                    <td className="p-4 text-center font-semibold">
                      {editando === c.id ? (
                        <input className="border border-blue-300 rounded px-2 py-1 w-16 text-center outline-none focus:ring-2 focus:ring-blue-100" value={nuevaCalificacion} onChange={(e) => setNuevaCalificacion(e.target.value)} />
                      ) : (c.calificacion)}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${c.calificacion >= 6 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {c.calificacion >= 6 ? "Aprobado" : "Reprobado"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        {editando === c.id ? (
                          <>
                            <button className="text-green-600 hover:text-green-700 font-bold text-xs" onClick={() => actualizarCalificacion(c.id)}>GUARDAR</button>
                            <button className="text-slate-400 hover:text-slate-600 font-bold text-xs" onClick={() => setEditando(null)}>CANCELAR</button>
                          </>
                        ) : (
                          <>
                            <button className="text-amber-600 hover:text-amber-700 font-bold text-xs uppercase" onClick={() => editarCalificacion(c)}>Editar</button>
                            <button className="text-red-500 hover:text-red-700 font-bold text-xs uppercase" onClick={() => abrirConfirmacion(c.id)}>Borrar</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>

        {/* SECCIÓN DE PROMEDIOS :) */}
        <div className="max-w-2xl">
          <h2 className="text-xl font-extrabold text-slate-800 mb-4 flex items-center">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></div>
            Resumen de Promedios Finales
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 font-bold text-slate-700 text-xs uppercase">Alumno</th>
                  <th className="p-4 font-bold text-slate-700 text-xs uppercase text-right">Promedio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {promedios.map((p, i) => (
                  <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-4 text-slate-700 font-medium">{p.nombre}</td>
                    <td className="p-4 text-right">
                      <span className={`text-lg font-bold ${p.promedio >= 6 ? "text-blue-600" : "text-red-600"}`}>
                        {Number(p.promedio).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {mostrarConfirmacion && (
        <Modal 
          mensaje="¿Estás seguro de que deseas borrar esta calificación?" 
          onConfirmar={confirmarEliminar} 
          onCancelar={() => setMostrarConfirmacion(false)} 
        />
      )}
    </div>
  );
}