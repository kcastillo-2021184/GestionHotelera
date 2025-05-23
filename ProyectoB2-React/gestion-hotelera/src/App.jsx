import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import VistaAdmin from './components/VistaAdmin';
import VistaClient from './components/VistaClient';
import VistaReservation from './components/VistaReservation';
import EliminarHotel from './components/eliminarHotel';
import VistaMisReservaciones from './components/VistaMyReservations';
import AgregarHotel from './components/AgregarHotel';
import ActualizarHotel from './components/ActualizarHoteles';
import ListarHoteles from './components/ListarHoteles';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<VistaAdmin />} />
      <Route path="/client" element={<VistaClient />} />  
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/reserva/:id" element={<VistaReservation />} />
      <Route path="/eliminar-hotel" element={<EliminarHotel />} />
      <Route path="/reservationsByUser" element={<VistaMisReservaciones />}/>
      <Route path="/agregar-hotel" element={<AgregarHotel />} />
      <Route path="/editar-hotel" element={<ActualizarHotel />} />
      <Route path="/listar-hotel" element={<ListarHoteles />} />
    </Routes>
  );
}

export default App;
