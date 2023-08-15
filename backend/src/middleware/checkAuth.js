require('dotenv').config()
const jwt = require('jsonwebtoken');
const{ User} = require('../db')

const checkAuth = async(req, res, next) => {

    const secret = process.env.JWT_SECRET;
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, secret)
            
            req.user = await User.findByPk(decoded.id, {
                attributes: ['id' ,'name', 'email'],
              })

            // console.log(req.user)

            return next()
        } catch (error) {
            return res.status(404).json({msg: 'Hubo un error'})
        }
    }

    if(!token) {
        const error = new Error('Token no válido')
        res.status(401).json({msg: error.message})
    }

    next()
}

module.exports = {
    checkAuth
}