import React from 'react'; 
import imagenBienvenida from '../components/1.jpeg';

const Dashboard = () => {
  return (
    <div style={{
      height: '100vh',
      backgroundColor: '#3b82f6',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '2rem'
      }}>
        <h2 style={{ margin: 0 }}>Sesión iniciada por ser lindo 👻</h2>
        <img 
          src={imagenBienvenida}
          alt="Bienvenida"
          style={{
            marginTop: '1.5rem',
            width: '200px',
            borderRadius: '12px',

          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
