import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

// Validación basada en el backend
const schema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  surname: yup.string().required('El apellido es obligatorio'),
  email: yup.string().email('Correo inválido').required('El correo es obligatorio'),
  username: yup
    .string()
    .required('El usuario es obligatorio')
    .transform((val) => val.toLowerCase()),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(8, 'Mínimo 8 caracteres')
    .matches(/[A-Z]/, 'Debe tener una mayúscula')
    .matches(/[a-z]/, 'Debe tener una minúscula')
    .matches(/[0-9]/, 'Debe tener un número')
    .matches(/[\W_]/, 'Debe tener un símbolo'),
  phone: yup
    .string()
    .required('El teléfono es obligatorio')
    .matches(/^[0-9+()\s-]{7,20}$/, 'Teléfono inválido'),
});

const Register = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3616/api/auth/register', data);

      if (response.data.success) {
        setRegisterError('');
        toast.success('Registro exitoso');
        navigate('/');
      } else {
        setRegisterError(response.data.message || 'Error al registrar');
        toast.error('Error al registrar');
      }
    } catch (error) {
      setRegisterError(error.response?.data?.message || 'Error de conexión o datos inválidos');
      toast.error('No se pudo completar el registro');
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Gestión Hotelera</h1>

      <form className="auth-box" onSubmit={handleSubmit(onSubmit)}>
        <h2>Registro</h2>

        {[
          { name: 'name', label: 'Nombre' },
          { name: 'surname', label: 'Apellido' },
          { name: 'email', label: 'Correo' },
          { name: 'username', label: 'Usuario' },
          { name: 'password', label: 'Contraseña', type: 'password' },
          { name: 'phone', label: 'Teléfono' }
        ].map(({ name, label, type = 'text' }) => (
          <div key={name} style={{ marginBottom: '0.5rem' }}>
            <input
              type={type}
              placeholder={label}
              {...register(name)}
            />
            {errors[name] && (
              <p style={{ color: 'red', margin: 0 }}>{errors[name]?.message}</p>
            )}
          </div>
        ))}

        {registerError && (
          <p style={{ color: 'red', marginBottom: '1rem' }}>{registerError}</p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Registrarse'}
        </button>

        <p>¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link></p>
      </form>
    </div>
  );
};

export default Register;
