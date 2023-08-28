const { Product } = require('../../db')

const sendQuery = async(req, res) => {

    const productId = req.params.id;
    const { userId, userName, message } = req.body;

    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      await product.addQuery(userId, userName, message);
      return res.status(201).json({ message: 'Consulta agregada con éxito' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al agregar consulta' });
    }
}

module.exports = {
  sendQuery
}

// const { Interaction, User, Product } = require('../../db');

// const saveMessage = async (req, res) => {
//   const { name, message, productId } = req.body;

//   try {
//     if(!name) {
//         const error = new Error('The name is required')
//         return res.status(404).json({msg: error.message})
//     }
//     if(!message) {
//         const error = new Error('The message is required')
//         return res.status(404).json({msg: error.message})
//     }

//     // const user = req.user;

//     else {
//       const interaction = await Interaction.create({
//         name,
//         message,
//         // userId: user.id,
//         productId 
//       });

//       res.status(200).json(interaction);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Error al guardar la interacción' });
//   }
// };



// const interactionProducts = async (req, res) => {
//   try {
//     const productWithInteractions = await Product.findByPk(productId, {
//       include: [
//         {
//           model: Interaction,
//           as: 'interactions'
//         }
//       ]
//     });

//     res.status(200).json(productWithInteractions)
//   } catch (error) {
//     console.log(error)
//   }
// }



// const interactionUsers = async (req, res) => {
//   try {
//     const interactions = await Interaction.findAll({
//       include: [
//         {
//           model: User,
//           as: 'user',
//           attributes: ['id', 'name', 'email']
//         },
//         {
//           model: Product,
//           as: 'product',
//           attributes: ['id', 'name'] 
//         }
//       ]
//     });

//     res.status(200).json(interactions);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Error al obtener las interacciones' });
//   }
// };




// module.exports = {
//   saveMessage,
//   interactionUsers,
//   interactionProducts
// };


// // const { Interaction, User, Product } = require('../../db');

// // const saveMessage = async (req, res) => {
// //   const { name, message, productId } = req.body;

// //   try {
// //     const errors = [];

// //     if (!name) {
// //       errors.push({ 'mensaje': 'Agrega tu Nombre' });
// //     }
// //     if (!message) {
// //       errors.push({ 'mensaje': 'Debes introducir un mensaje' });
// //     }

// //     if (errors.length > 0) {
// //       const interactions = await Interaction.findAll();

// //       res.render('interaction', {
// //         errors,
// //         name,
// //         message
// //       });
// //     } else {
// //       const user = 2; // Assuming you have the authenticated user stored in req.user

// //       const interaction = await Interaction.create({
// //         name,
// //         message,
// //         userId: user.id, // Set the user ID for the interaction
// //         productId // Set the product ID for the interaction
// //       });

// //       res.status(200).json(interaction);
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ error: 'Error al guardar la interacción' });
// //   }
// // };

// // const interactionUsers = async (req, res) => {
// //   try {
// //     const interactions = await Interaction.findAll({
// //       include: [
// //         {
// //           model: User,
// //           as: 'user',
// //           attributes: ['id', 'name', 'email']
// //         },
// //         {
// //           model: Product,
// //           as: 'product',
// //           attributes: ['id', 'name'] // Include only the required product attributes
// //         }
// //       ]
// //     });

// //     res.status(200).json(interactions);
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ error: 'Error al obtener las interacciones' });
// //   }
// // };

// // module.exports = {
// //   saveMessage,
// //   interactionUsers
// // };



// // const { Interaction, User, Product } = require('../../db');

// // const saveMessage = async (req, res) => {
// //   const { name, message } = req.body;

// //   try {
// //     const errors = [];

// //     if (!name) {
// //       errors.push({ 'mensaje': 'Agrega tu Nombre' });
// //     }
// //     if (!message) {
// //       errors.push({ 'mensaje': 'Debes introducir un mensaje' });
// //     }

// //     if (errors.length > 0) {
// //       const interactions = await Interaction.findAll();

// //       res.render('interaction', {
// //         errors,
// //         name,
// //         message
// //       });
// //     } else {
// //       const user = req.user; // Assuming you have the authenticated user stored in req.user

// //       const interaction = await Interaction.create({
// //         name,
// //         message,
// //         userId: user.id // Set the user ID for the interaction
// //       });

// //       res.status(200).json(interaction);
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ error: 'Error al guardar la interacción' });
// //   }
// // };

// // const interactionUsers = async (req, res) => {
// //   try {
// //     const interactions = await Interaction.findAll({
// //       include: [
// //         {
// //           model: User,
// //           as: 'user',
// //           attributes: ['id', 'name', 'email'] // Include only the required user attributes
// //         }
// //       ]
// //     });

// //     res.status(200).json(interactions);
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ error: 'Error al obtener las interacciones' });
// //   }
// // };

// // module.exports = {
// //   saveMessage,
// //   interactionUsers
// // };

// // const {Interaction} = require('../../db')

// // const saveMessage = async (req, res) => {

// //     const {name, message} = req.body

// //     const errors = []

// //     if(!name) {
// //         errors.push({'mensaje': 'Agrega tu Nombre'})
// //     }
// //     if(!message) {
// //         errors.push({'mensaje': 'Debes introducir un mensaje'})
// //     }
// //     if(errors.length > 0) {
// //         const interactions = await Interaction.findAll()

// //         res.render('interaction' , {
// //             errors,
// //             name,
// //             message
// //         })
// //     } else {
// //         try {
// //             await Interaction.create({
// //                 name,
// //                 message
// //             })

// //             res.status(200).json(Interaction)
// //         } catch (error) {
// //             console.log(error)
// //         }
// //     }

// // }

// // const interactionUsers = async(req, res) => {
// //     try {
// //         const interacctions = await Interaction.findAll()

// //         // res.render(interacctions)

// //         res.status(200).json(interacctions)
// //     } catch (error) {
// //         console.log(error)
// //     }
// // }

// // module.exports = {
// //     saveMessage,
// //     interactionUsers
// // }
