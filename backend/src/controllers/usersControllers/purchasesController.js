const{ User} = require('../../db')

const savePurchases = async (req, res) => {
    const userId = req.params.id

    const {id, name, price, quantity, description, rating } = req.body;
    try {
        const user = await User.findByPk(userId)

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }

          console.log(id, name, price, quantity, description);


        await user.addBuy(id, name, price, quantity, description, rating)
        res.status(201).json({message: "compra almacenada"})
    } catch (error) {
        console.log(error);
        res.status(400).json({massage: error})
    }

}

const getMyPurchases = async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id); 
    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const purchaseOrders = user.purchaseOrder;

    return res.status(200).json(purchaseOrders)
}

const getAllPurchases = async (req, res) => {
    try {
        const allUsers = await User.findAll();

        const allPurchasesWithUser = allUsers.flatMap(user => {
            return user.purchaseOrder.map(purchase => ({
                userId: user.id,
                userName: user.name,
                userEmail: user.email,
                purchaseDetails: purchase
            }));
        });

        return res.status(200).json(allPurchasesWithUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = {
    savePurchases,
    getMyPurchases,
    getAllPurchases
}
