const {Router}=require('express')

const router = Router()

const  {users, createUser, authenticateUser} = require('../controllers/userController')

//Autenticacion , registro y confirmacion de usuarios
 
router.get('/', users)

router.post('/', createUser)
router.post('/login', authenticateUser)

router.post('/', )

router.put('/', )

router.delete('/', )

module.exports = router