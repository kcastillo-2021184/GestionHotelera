import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import VistaAdmin from './components/VistaAdmin';
import VistaClient from './components/VistaClient';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<VistaAdmin />} />
      <Route path="/client" element={<VistaClient />} />  
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
