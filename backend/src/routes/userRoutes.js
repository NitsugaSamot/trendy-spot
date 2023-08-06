const {Router}=require('express')

const router = Router()

const  {users, createUser, authenticateUser, getUserByName} = require('../controllers/users/userController')

//Autenticacion , registro y confirmacion de usuarios
 
router.get('/',getUserByName)
router.post('/', createUser)
router.post('/login', authenticateUser)

router.put('/', )

router.delete('/', )

module.exports = router