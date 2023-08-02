const{ User} = require('../db')
const {generateToken} = require('../helpers/generateToken')

const users = (req, res) => {
    // console.log(req.body)     
    res.json({ msg : 'desde users'})
}

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
        const error = new Error('the user does not exist')
        return res.status(404).json({msg: error.message})
    }

    //Comprobar si esta confirmated
    if(!user.confirmated) {
        const error = new Error('Your count is not confimed')
        res.status(403).json({msg: error.message})
    }
 
    //Comprobar su  password
}

 
module.exports = {users, createUser, authenticateUser }  