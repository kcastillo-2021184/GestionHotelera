import User from '../user/user.model.js';
import { checkPassword, encrypt } from '../../utils/encrypt.js';
import { generateJwt } from '../../utils/jwt.js';

// Test
export const test = (req, res) => {
  console.log('test is running');
  return res.send({ message: 'Test is running' });
};

export const register = async (req, res) => {
    try {
      const { email, username, password, phone, surname, name, role } = req.body;
  
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: 'El correo ya está registrado' });
      }
  
      // Crear el nuevo usuario con todos los campos requeridos
      let user = new User({
        email,
        username,
        password,  // La contraseña será encriptada a continuación
        phone,
        surname,
        name,
        role
      });
  
      // Encriptar la contraseña
      user.password = await encrypt(user.password);
  
      // Guardar el usuario en la base de datos
      await user.save();
  
      // Generar el token JWT
      const token = await generateJwt(user);
  
      // Responder con el token y mensaje de éxito
      return res.status(201).send({
        success: true,
        message: `Usuario registrado exitosamente. Puedes iniciar sesión con el correo: ${user.email}`,
        token,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error general al registrar el usuario', err });
    }
  };

// Login
export const login = async (req, res) => {
  try {
    const { userLoggin, password } = req.body;

    // Buscar al usuario por correo o nombre de usuario
    let user = await User.findOne({
      $or: [
        { email: userLoggin },
        { username: userLoggin },
      ],
    });

    // Verificar si el usuario existe y si la contraseña es correcta
    if (user && await checkPassword(user.password, password)) {
      // Crear un objeto con datos no sensibles del usuario
      let loggedUser = {
        uid: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
      };

      // Generar el token JWT
      let token = await generateJwt(loggedUser);

      // Responder con el token y datos del usuario
      return res.send({
        message: `Bienvenido ${user.name}`,
        loggedUser,
        token,
      });
    }

    // Si las credenciales no son válidas
    return res.status(400).send({ message: 'Correo o contraseña incorrectos' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error general en la función de login' });
  }
};
