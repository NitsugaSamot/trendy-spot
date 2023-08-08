const{ User} = require('../../db')
const { Op } = require("sequelize");
const {generateToken} = require('../../helpers/generateToken')
const {generateJWT} = require('../../helpers/generateJWT')


const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificar si el usuario ya existe por su email
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            // Si el usuario ya existe, devuelve un error indicando que el email ya está en uso.
            return res.status(409).json({ error: 'Email is already in use' }); 
        }  

        // user.token = generateToken()
        // Si el usuario no existe, crea uno nuevo
        const user = await User.create({ 
            name,
            email,
            password, 
            token: generateToken()
        });

        res.status(201).json(user);
        // console.log(user);
    } catch (error) { 
        console.log(error);
        res.status(500).json({ error: 'Error when creating the user..' });
    }
};

const authenticateUser = async (req, res ) => {
    const {email, password} = req.body

    //Comprobar si el usuario existe
    const user = await User.findOne({ where: { email }})
    
    if(!user) {
        const error = new Error('The user does not exist')
        return res.status(404).json({msg: error.message})
    }

    //Comprobar si esta confirmated
    if(!user.confirmated) {
        const error = new Error('Your count is not confimed')
        res.status(403).json({msg: error.message})
    }
 
    //Comprobar su  password
    const isPasswordCorrect = await user.checkPassword(password);


//     UPDATE users
// SET confirmated = true
// WHERE id = tu_id;
    if (isPasswordCorrect) {

        res.json({
          id: user.id,
          name: user.name,
          email: user.email,
          token: generateJWT(user.id),
        });
      } else {
        const error = new Error('Incorrect password');
        res.status(403).json({ msg: error.message });
      }



};

const confirmAccount = async (req, res) => {
    const { token } = req.params;
    const userConfirm = await User.findOne({ where: { token } });
  
    if (!userConfirm) {
      const error = new Error('Invalid token');
      return res.status(403).json({ msg: error.message });
    }
  
    try {
      userConfirm.confirmated = true;
      userConfirm.token = '';
      await userConfirm.save(); // Save the changes to the database
    //   console.log(userConfirm);
      res.json({ msg: 'Account confirmed successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Error confirming the account' });
    }
  };
  
  getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.findAll();

        const users = allUsers.map(user => {
            const { id, name, email } = user;
            return { id, name, email };
        });

        return res.json(users);
    } catch (error) {

        console.error(error);
        return res.status(400).json({ message: "Error in obtaining users" });
    }
}



const getUserByName = async (req, res) => {
    const { name } = req.query;
    console.log(name)
    try {
        const userByName = await User.findAll({
            where: {
                name: { [Op.iLike]: `%${name}%`}
            }
        })
        if(!userByName){
            throw Error(`${name} no se encontro coicidencias`)
        }else{
            res.status(200).json(userByName)
        }

    } catch (error) {
        res.status(500).json({error: error.message})
        
    }
};

// const getAllUsers = async(req, res) => {
//     const users = await User.findAll()

//     res.status(200).json(users)
// }

const getUserById = async (req, res) => {

    const {id} = req.params 

    const userData = await User.findOne({where: {id}})

    const user = {
        id: userData.id,
        name: userData.name,
        email: userData.name,

    }

    return res.json(user)
}


const profile = async (req, res) => {
    // console.log('desde perfil')
    const {user} = req

    res.json(user)
}


 
module.exports = { createUser, authenticateUser, confirmAccount ,getAllUsers ,getUserByName, profile, getUserById }  
// const{ User} = require('../../db')
// const {generateToken} = require('../../helpers/generateToken')
// const { Op } = require("sequelize");

// const createUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Verificar si el usuario ya existe por su email
//         const existingUser = await User.findOne({ where: { email } });
//         if (existingUser) {
//             // Si el usuario ya existe, devuelve un error indicando que el email ya está en uso.
//             return res.status(409).json({ error: 'Email is already in use' }); 
//         }  

//         // user.token = generateToken()
//         // Si el usuario no existe, crea uno nuevo
//         const user = await User.create({ 
//             name,
//             email,
//             password, 
//             token: generateToken()
//         });

//         res.status(201).json(user);
//         // console.log(user);
//     } catch (error) { 
//         console.log(error);
//         res.status(500).json({ error: 'Error when creating the user..' });
//     }
// };

// const authenticateUser = async (req, res ) => {
//     const {email, password} = req.body

//     //Comprobar si el usuario existe
//     const user = await User.findOne({ where: { email }})
    
//     if(!user) {
//         const error = new Error('the user does not exist')
//         return res.status(404).json({msg: error.message})
//     }

//     //Comprobar si esta confirmated
//     if(!user.confirmated) {
//         const error = new Error('Your count is not confimed')
//         res.status(403).json({msg: error.message})
//     }
 
//     //Comprobar su  password
// };

// const getUserByName = async (req, res) => {
//     const { name } = req.query;
//     console.log(name)
//     try {
//         const userByName = await User.findAll({
//             where: {
//                 name: { [Op.iLike]: `%${name}%`}
//             }
//         })
//         if(!userByName){
//             throw Error(`${name} no se encontro coicidencias`)
//         }else{
//             res.status(200).json(userByName)
//         }

//     } catch (error) {
//         res.status(500).json({error: error.message})
        
//     }
// };



 
// module.exports = { createUser, authenticateUser, getUserByName }  