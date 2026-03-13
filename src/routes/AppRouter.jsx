import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";   
import Index from "../pages/Index";
import Calificaciones from "../pages/Calificaciones";
import ProtectedRoute from "./ProtectedRoute";

/* ESTE ARCHIVO CONTROLA QUÉ PÁGINA SE MUESTRA SEGÚN LA RUTA :) */
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ACCESO PÚBLICO: AUTENTICACIÓN :) */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ACCESO PRIVADO: GESTIÓN ESCOLAR :) */}
        <Route
          path="/alumnos"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        />

        <Route
          path="/calificaciones"
          element={
            <ProtectedRoute>
              <Calificaciones />
            </ProtectedRoute>
          }
        />

        {/* RUTA POR DEFECTO: PODRÍAS AGREGAR UNA PÁGINA 404 AQUÍ :) */}
        <Route path="*" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;