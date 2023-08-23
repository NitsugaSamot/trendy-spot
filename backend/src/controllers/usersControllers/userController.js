const { User } = require("../../db");
const { Op } = require("sequelize");
const { generateToken } = require("../../helpers/generateToken");
const { generateJWT } = require("../../helpers/generateJWT");
const { emailRegister, emailForgetPassword } = require("../../helpers/email");

const createUser = async (req, res) => {
  try {
    //Datos necesarios para el registro
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe por su email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      // Si el usuario ya existe, devuelve un error indicando que el email ya está en uso.
      return res.status(409).json({ error: "Email is already in use" });
    }

    // user.token = generateToken()
    // Si el usuario no existe, crea uno nuevo
    const user = await User.create({
      name,
      email,
      password,
      token: generateToken(),
    });

    //Enviar email de confirmacion
    emailRegister({
      email: user.email,
      name: user.name,
      token: user.token,
    });

    res.json({
      msg: "Usuario creado correctamente, hemos enviado un mail a tu casilla de correo para que confirmes tu cuenta",
    });

    // console.log(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  //Comprobar si el usuario existe
  const user = await User.findOne({ where: { email } });

  if (!user) {
    const error = new Error("The user does not exist");
    return res.status(404).json({ msg: error.message });
  }

  //Comprobar si esta confirmated
  if (!user.confirmated) {
    const error = new Error("Your count is not confimed");
    res.status(400).json({ msg: error.message });
  }

  //Comprobar su  password mediante bcrypt compare establecito en el modelo User
  const isPasswordCorrect = await user.checkPassword(password);

  //Si la contraseña es correcta, responde con los detalles del usuario y un token JWT generado utilizando generateJWT()
  if (isPasswordCorrect) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user.id),
    });
  } else {
    const error = new Error("Incorrect password");
    res.status(403).json({ msg: error.message });
  }
};

const confirmAccount = async (req, res) => {
  //Extrae el token de la url
  const { token } = req.params;
  //Busca en la base de datos un usuario con el token proporcionado.
  const userConfirm = await User.findOne({ where: { token } });

  if (!userConfirm) {
    const error = new Error("Invalid token");
    return res.status(403).json({ msg: error.message });
  }

  try {
    userConfirm.confirmated = true;
    userConfirm.token = "";
    await userConfirm.save(); // Gyarda los cambios de token y confirmated
    //   console.log(userConfirm);
    res.json({ msg: "Account confirmed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error confirming the account" });
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;

  //Comprobar si el usuario existe
  const user = await User.findOne({ where: { email } });

  if (!user) {
    const error = new Error("The user does not exist");
    return res.status(404).json({ msg: error.message });
  }

  try {
    user.token = generateToken();
    await user.save();

    //Enviar el email
    emailForgetPassword({
      email: user.email,
      name: user.name,
      token: user.token,
    });

    res.json({
      msg: "Revisa tu email y entra al enlace para resetear tu contraseña",
    });
  } catch (error) {
    console.log(error);
  }
};

const testToken = async (req, res) => {
  const { token } = req.params;

  const validToken = await User.findOne({ where: { token } });

  if (validToken) {
    res.json({ msg: "Actualiza tu password" });
  } else {
    const error = new Error("Invalid token");
    return res.status(403).json({ msg: error.message });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ where: { token } });

  if (user) {
    //añadimos nuevo password
    user.password = password;
    //reseteamos token a vacio
    user.token = "";
    //guardamos los cambios
    await user.save();
    res.json({ msg: "Password modificado con Éxito" });
  } else {
    const error = new Error("Invalid token");
    return res.status(403).json({ msg: error.message });
  }
};

const updateProfile = async (req, res) => {
  const user = await User.findByPk(req.params.id)

  if(!user) {
      const error = new Error('error')
      return res.status(400).json({msg: error.message})
  }

  const {email} = req.body

  if(user.email !== req.body.email) {
      const existingEmail = await User.findOne({ where: { email } })
      if(existingEmail) {
          const error = new Error('There is already a registered user with this email')
          return res.status(400).json({msg: error.message})
      }
  }

  try {
      user.name = req.body.name
      user.email = req.body.email

      const updateUser = await user.save()
      res.json(updateUser)
  } catch (error) {
      console.log(error)
  }
}

const updatePassword = async (req, res) => {
  const {id} = req.user
  const {pwd_curr, pwd_new} = req.body

  const user = await User.findByPk(id)

  if(!user) {
      const error = new Error('Hubo un error')
      return res.status(400).json({msg: error.message})
  }

  if(await user.checkPassword(pwd_curr)) {
      user.password = pwd_new
      await user.save()
      res.json({msg: 'Password updated correctly'})
  }else{
      const error = new Error('The current password is incorrect');
      return res.status(403).json({ msg: error.message });
  }
  
}

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();

    const users = allUsers.map((user) => {
      const { id, name, email,  purchaseOrder } = user;
      return { id, name, email,  purchaseOrder };
    });

    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error in obtaining users" });
  }
};

const getUserByName = async (req, res) => {
  const { name } = req.query;
  console.log(name);
  try {
    const userByName = await User.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
    });
    if (!userByName) {
      throw Error(`${name} no se encontro coicidencias`);
    } else {
      res.status(200).json(userByName);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const userData = await User.findOne({ where: { id } });

  const user = {
    id: userData.id,
    name: userData.name,
    email: userData.name,
  };

  return res.json(user);
};

const profile = async (req, res) => {
  // console.log('desde perfil')
  const { user } = req;

  res.json(user);
};

const putUserDelete = async (req, res) => {
  try {
      const userDeleted = req.body;
  const { id, isDeleted } = userDeleted
  const deleted = await User.update({ isDeleted: true },
      {
        where: {
          id: id
        }
      })
  res.status(200).json(deleted)
  }catch(error){
      console.log({error: error})
  }
}

module.exports = {
  createUser,
  authenticateUser,
  confirmAccount,
  resetPassword,
  testToken,
  newPassword,
  updateProfile,
  updatePassword,
  getAllUsers,
  getUserByName,
  profile,
  getUserById,
  putUserDelete
};
