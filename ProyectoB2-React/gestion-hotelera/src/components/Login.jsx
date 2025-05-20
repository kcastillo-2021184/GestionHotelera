import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

// Validación fuerte como en el backend
const schema = yup.object().shape({
  userLoggin: yup
    .string()
    .required('El usuario o correo es obligatorio')
    .trim(),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(8, 'Mínimo 8 caracteres')
    .matches(/[A-Z]/, 'Debe tener una mayúscula')
    .matches(/[a-z]/, 'Debe tener una minúscula')
    .matches(/[0-9]/, 'Debe tener un número')
    .matches(/[\W_]/, 'Debe tener un símbolo'),
});

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3616/api/auth/login', {
        userLoggin: data.userLoggin,
        password: data.password
      });

      const { token, loggedUser: user, message } = response.data;
      console.log('Respuesta completa:', response.data);
 
      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Sesión iniciada correctamente');
 
        if (user.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/client');
        }
      }
    else {
        setLoginError(message || 'Credenciales incorrectas');
        toast.error('Credenciales incorrectas');
      }
    } catch (error) {
      setLoginError('Error de conexión o credenciales inválidas');
      toast.error('Error al iniciar sesión');
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">GESTIÓN HOTELERA</h1>

      <form className="auth-box" onSubmit={handleSubmit(onSubmit)}>
        <h2>INICIAR SESIÓN</h2>

        <div style={{ marginBottom: '0.5rem' }}>
          <input
            type="text"
            placeholder="Correo o usuario"
            {...register('userLoggin')}
          />
          {errors.userLoggin && (
            <p style={{ color: 'white', margin: 0 }}>{errors.userLoggin.message}</p>
          )}
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <input
            type="password"
            placeholder="Contraseña"
            {...register('password')}
          />
          {errors.password && (
            <p style={{ color: 'white', margin: 0 }}>{errors.password.message}</p>
          )}
        </div>

        {/* Mensaje de error general */}
        {loginError && (
          <p style={{ color: 'white', marginBottom: '1rem' }}>{loginError}</p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Ingresando...' : 'Entrar'}
        </button>

        <p>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p>
      </form>
    </div>
  );
};

export default Login;
