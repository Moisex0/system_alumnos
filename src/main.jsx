import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/* AQUI SE INICIA LA APLICACION DE REACT Y SE MUESTRA DENTRO DEL DIV ROOT DEL HTML :) */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)