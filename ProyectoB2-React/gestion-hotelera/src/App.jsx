import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; // ⬅️ Asegúrate que esta línea esté

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} /> {/* ⬅️ Esta línea también */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
