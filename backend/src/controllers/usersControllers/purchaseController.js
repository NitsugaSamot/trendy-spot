const{ User} = require('../../db')

const savePurchases = async (req, res) => {
    const userId = req.params.id

    const {id, name, price, quantity, description} = req.body;
    try {
        const user = await User.findByPk(userId)

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }

        await user.addBuy(id, name, price, quantity, description)
        res.status(201).json({message: "compra almacenada"})
    } catch (error) {
        console.log(error);
        res.status(400).json({massage: error})
    }
}

module.exports = {
    savePurchases
}