const { Op } = require('sequelize');
const {Product} = require('../../db');

// http://localhost:3004/products/search?minPrice=5800&maxPrice=8000

const filterProductsByPriceRange = async (req, res) => {
    const { minPrice, maxPrice } = req.query;
  
    if (!minPrice || !maxPrice) {
      return res.status(400).json({ error: 'Debe proporcionar valores para minPrice y maxPrice.' });
    }
  
    try {
      const dbProducts = await Product.findAll({
        where: {
          price: {
            [Op.between]: [parseInt(minPrice), parseInt(maxPrice)],
          },
        },
      });
  
      if (!dbProducts.length) {
        return res.json([]);
      }
  
      return res.json(dbProducts);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener los productos.' });
    }
  };
  


module.exports = {
  filterProductsByPriceRange,
};


//   router.get('/', get
// router.get('/search', async (req, res) => {
//     const { minPrice, maxPrice } = req.query;
  
//     if (!minPrice || !maxPrice) {
//       return res.status(400).json({ error: 'Debe proporcionar valores para minPrice y maxPrice.' });
//     }
  
//     const productsInPriceRange = await searchProductsByPriceRange(parseInt(minPrice), parseInt(maxPrice));
  
//     return res.json(productsInPriceRange);
//   });


// const searchProductsByPriceRange = async (minPrice, maxPrice) => {

    
//   const dbProducts = await Product.findAll({
//     where: {
//       price: {
//         [Op.between]: [minPrice, maxPrice],
//       },
//     },
//   });

//   if (!dbProducts.length) {
//     return [];
//   }

//   return dbProducts;
// };

// const{ Product } = require('../../db');
// const { Op } = require('sequelize');


// const minPrice = 200;
// const maxPrice = 2000;

// const { Op } = require('sequelize');
// const Product = require('../models/product'); // Importa el modelo de Product si no lo has hecho ya.

// const searchProductsByPriceRange = async (minPrice, maxPrice) => {
//   const dbProducts = await Product.findAll({
//     where: {
//       price: {
//         [Op.between]: [minPrice, maxPrice],
//       },
//     },
//   });

//   if (!dbProducts.length) {
//     return [];
//   }

//   return dbProducts;
// };

// module.exports = {
//   searchProductsByPriceRange,
// };
// Luego, en tu archivo de router, importa la función y utilízala como un manejador de ruta adicional:
// javascript
// Copy code
// // routes.js (suponiendo que este es tu archivo de router)

// const { Router } = require('express');
// const router = Router();

// const {
//   getAllOrByNameProducts,
//   getProductById,
// } = require('../handlers/product/getProductHandlers');

// const newProductHandler = require('../handlers/product/createProductHandler');
// const { searchProductsByPriceRange } = require('../path/to/productHandlers');

// const validation = require('../helpers/validation');

// // ... Resto de tus rutas existentes ...

// // Ruta para buscar productos por rango de precios.
// router.get('/search', async (req, res) => {
//   const { minPrice, maxPrice } = req.query;

//   if (!minPrice || !maxPrice) {
//     return res.status(400).json({ error: 'Debe proporcionar valores para minPrice y maxPrice.' });
//   }

//   const productsInPriceRange = await searchProductsByPriceRange(parseInt(minPrice), parseInt(maxPrice));

//   return res.json(productsInPriceRange);
// });

// module.exports = router;
// En este ejemplo, he agregado una nueva ruta /search que espera recibir los parámetros minPrice y maxPrice en la consulta. Luego, utiliza la función searchProductsByPriceRange para buscar productos dentro del rango de precios proporcionado y devuelve los resultados en formato JSON.

// Recuerda ajustar las rutas, nombres de archivos y ubicaciones de acuerdo a tu estructura de proyecto y configuración.







// const searchProductsByPriceRange = async (minPrice, maxPrice) => {
//     const dbProducts = await Product.findAll({
//       where: {
//         price: {
//           [Op.between]: [minPrice, maxPrice],
//         },
//       },
//     });
  
//     if (!dbProducts.length) {
//       return "No se encontraron productos en ese rango de precios.";
//     }
  
//     return dbProducts;
//   };

//   const productsInPriceRange = await searchProductsByPriceRange(minPrice, maxPrice);
  

//   module.exports = {
//     searchProductsByPriceRange
//   }