import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import TablaAlumnos from "../components/TablaAlumnos";
import Navbar from "../components/Navbar";
import Alerta from "../components/Alerta";

export default function Index() {
  /* LISTA DE ALUMNOS DEL USUARIO :) */
  const [alumnos, setAlumnos] = useState([]);

  /* DATOS DEL FORMULARIO PARA CREAR ALUMNO :) */
  const [nombre, setNombre] = useState("");
  const [grado, setGrado] = useState("");
  const [grupo, setGrupo] = useState("");
  const [correo, setCorreo] = useState("");

  /* CONTROL PARA EDITAR ALUMNOS :) */
  const [editando, setEditando] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoGrado, setNuevoGrado] = useState("");
  const [nuevoGrupo, setNuevoGrupo] = useState("");
  const [nuevoCorreo, setNuevoCorreo] = useState("");

  /* MENSAJES DE ALERTA :) */
  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("");

  /* CONTROL DEL MODAL PARA ELIMINAR :) */
  const [mostrarModal, setMostrarModal] = useState(false);
  const [alumnoEliminar, setAlumnoEliminar] = useState(null);

  const API = "http://localhost:3000";

  /* OBTENER ALUMNOS DEL USUARIO */
  const obtenerAlumnos = async () => {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (!usuario || !usuario.id) return;

      const res = await axios.get(`${API}/alumnos?usuario_id=${usuario.id}`);
      setAlumnos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerAlumnos();
  }, []);

  /* LIMPIEZA AUTOMÁTICA DE ALERTAS :) */
  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        setMensaje("");
        setTipo("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  /* AGREGAR NUEVO ALUMNO */
  const agregarAlumno = async () => {
    if (!nombre || !grado || !grupo || !correo) {
      setMensaje("Llena todos los campos");
      setTipo("error");
      return;
    }

    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      await axios.post(`${API}/alumnos`, {
        nombre, grado, grupo, correo,
        usuario_id: usuario.id
      });

      setMensaje("Alumno registrado con éxito");
      setTipo("success");
      setNombre(""); setGrado(""); setGrupo(""); setCorreo("");
      obtenerAlumnos();
    } catch (error) {
      setMensaje("Error al agregar alumno");
      setTipo("error");
    }
  };

  const abrirModalEliminar = (id) => {
    setAlumnoEliminar(id);
    setMostrarModal(true);
  };

  const confirmarEliminar = async () => {
    try {
      await axios.delete(`${API}/alumnos/${alumnoEliminar}`);
      setMostrarModal(false);
      setMensaje("Registro eliminado correctamente");
      setTipo("success");
      obtenerAlumnos();
    } catch (error) {
      setMensaje("Error al eliminar");
      setTipo("error");
    }
  };

  const editarAlumno = (alumno) => {
    setEditando(alumno.id);
    setNuevoNombre(alumno.nombre);
    setNuevoGrado(alumno.grado);
    setNuevoGrupo(alumno.grupo);
    setNuevoCorreo(alumno.correo);
  };

  const actualizarAlumno = async (id) => {
    try {
      await axios.put(`${API}/alumnos/${id}`, {
        nombre: nuevoNombre,
        grado: nuevoGrado,
        grupo: nuevoGrupo,
        correo: nuevoCorreo
      });
      setEditando(null);
      setMensaje("Datos actualizados");
      setTipo("success");
      obtenerAlumnos();
    } catch (error) {
      setMensaje("Error al actualizar");
      setTipo("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="p-8 max-w-7xl mx-auto">
        {/* ENCABEZADO DE SECCIÓN :) */}
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800">Panel de Alumnos</h1>
          <p className="text-slate-500 font-medium">Administra la base de datos de los estudiantes registrados.</p>
        </header>

        <Alerta mensaje={mensaje} tipo={tipo} />

        {/* CONTENEDOR DEL FORMULARIO :) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 transition-all">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Nuevo Registro</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-600 ml-1">Nombre Completo</label>
              <input 
                className="border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" 
                placeholder="Nombre del alumno" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-600 ml-1">Grado</label>
              <input 
                className="border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" 
                placeholder="Ej: 5to" 
                value={grado} 
                onChange={(e) => setGrado(e.target.value)} 
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-600 ml-1">Grupo</label>
              <input 
                className="border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" 
                placeholder="Ej: B" 
                value={grupo} 
                onChange={(e) => setGrupo(e.target.value)} 
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-600 ml-1">Correo Electrónico</label>
              <input 
                className="border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" 
                placeholder="correo@ejemplo.com" 
                value={correo} 
                onChange={(e) => setCorreo(e.target.value)} 
              />
            </div>

            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg shadow-md shadow-blue-100 transition-all transform active:scale-95 text-sm" 
              onClick={agregarAlumno}
            >
              Registrar Alumno
            </button>
          </div>
        </div>

        {/* ÁREA DE LA TABLA :) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
          <TablaAlumnos
            alumnos={alumnos}
            editando={editando}
            nuevoNombre={nuevoNombre}
            nuevoGrado={nuevoGrado}
            nuevoGrupo={nuevoGrupo}
            nuevoCorreo={nuevoCorreo}
            setNuevoNombre={setNuevoNombre}
            setNuevoGrado={setNuevoGrado}
            setNuevoGrupo={setNuevoGrupo}
            setNuevoCorreo={setNuevoCorreo}
            actualizarAlumno={actualizarAlumno}
            setEditando={setEditando}
            editarAlumno={editarAlumno}
            eliminarAlumno={abrirModalEliminar}
          />
        </div>
      </div>

      {/* MODAL DE CONFIRMACIÓN :) */}
      {mostrarModal && (
        <Modal
          mensaje="¿Estás seguro de que deseas eliminar permanentemente a este alumno?"
          onConfirmar={confirmarEliminar}
          onCancelar={() => setMostrarModal(false)}
        />
      )}
    </div>
  );
}