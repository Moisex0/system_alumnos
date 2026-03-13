import { Navigate } from "react-router-dom";

/* ESTE COMPONENTE PROTEGE LAS RUTAS PRIVADAS DEL SISTEMA :) */
function ProtectedRoute({ children }) {

  /* REVISAMOS SI EXISTE EL OBJETO USUARIO EN EL ALMACENAMIENTO LOCAL :) */
  const usuario = localStorage.getItem("usuario");

  /* SI NO EXISTE EL USUARIO, REDIRIGIMOS AL LOGIN.
     USAMOS 'replace' PARA QUE EL USUARIO NO PUEDA REGRESAR CON EL BOTÓN "ATRÁS"
     A UNA RUTA PROTEGIDA DESPUÉS DE SALIR. :) 
  */
  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  /* SI EL USUARIO ESTÁ AUTENTICADO, RENDERIZAMOS LOS COMPONENTES HIJOS :) */
  return children;
}

export default ProtectedRoute;