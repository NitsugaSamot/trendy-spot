const { Op } = require('sequelize');
const {Product} = require('../../db');
const {Brand } = require('../../db')

// http://localhost:3004/products/search?minPrice=5800&maxPrice=8000

const filterByBrands = async (req, res) => {
    const brandName = req.params.brandName;
    const products = await Product.findAll({ where: { productbrand: brandName } });
  
    if (products.length > 0) {
      return res.status(200).json(products);
    }
  
    return res.status(404).json({ message: "No se encontraron productos para esta marca." });
  };
  
  const filterProductsByPriceRange = async (req, res) => {
    const { minPrice, maxPrice } = req.query;
  
    if (!minPrice || !maxPrice) {
      return res.status(400).json({ error: 'Debe proporcionar valores para minPrice y maxPrice.' });
    }
  
    const parsedMinPrice = parseInt(minPrice);
    const parsedMaxPrice = parseInt(maxPrice);
  
    if (isNaN(parsedMinPrice) || isNaN(parsedMaxPrice)) {
      return res.status(400).json({ error: 'Los valores proporcionados para minPrice y maxPrice deben ser números válidos.' });
    }
  
    if (parsedMinPrice >= parsedMaxPrice) {
      return res.status(400).json({ error: 'El precio mínimo debe ser mayor al precio máximo.' });
    }
  
    try {
      const dbProducts = await Product.findAll({
        where: {
          price: {
            [Op.between]: [parsedMinPrice, parsedMaxPrice],
          },
        },
      });
  
      if (!dbProducts.length) {
        return res.json([]);
      }
  
      return res.json(dbProducts);
    } catch (error) {
      return res.status(400).json({ error: 'Error al obtener los productos.' });
    }
  };
  
// const filterProductsByPriceRange = async (req, res) => {
//     const { minPrice, maxPrice } = req.query;
  
//     if (!minPrice || !maxPrice) {
//       return res.status(400).json({ error: 'Debe proporcionar valores para minPrice y maxPrice.' });
//     }
  
//     try {
//       const dbProducts = await Product.findAll({
//         where: {
//           price: {
//             [Op.between]: [parseInt(minPrice), parseInt(maxPrice)],
//           },
//         },
//       });
  
//       if (!dbProducts.length) {
//         return res.json([]);
//       }
  
//       return res.json(dbProducts);
//     } catch (error) {
//       return res.status(400).json({ error: 'Error al obtener los productos.' });
//     }
//   };

// const filterProductsByPriceRange = async (req, res) => {
//     const { minPrice, maxPrice } = req.query;
  
//     if (!minPrice || !maxPrice) {
//       return res.status(400).json({ error: 'Debe proporcionar valores para minPrice y maxPrice.' });
//     }
  
//     try {
//       const dbProducts = await Product.findAll({
//         where: {
//           price: {
//             [Op.between]: [parseInt(minPrice), parseInt(maxPrice)],
//           },
//         },
//       });
  
//       if (!dbProducts.length) {
//         return res.json([]);
//       }
  
//       return res.json(dbProducts);
//     } catch (error) {
//       return res.status(500).json({ error: 'Error al obtener los productos.' });
//     }
//   };


  /* ESTE ES EL SUPER CONTROLLER QUE COMBINA FILTRADOS, QUEDA PENDIENTE LOGRAR IMPLEMENTARLO EN EL FRONT 
  http://localhost:3004/products/filter?brandName=Nike&minPrice=7000&maxPrice=
  
  Lo pueden usar tanto con marca como sin marca y filtra igual
  http://localhost:3004/products/filter?brandName=&minPrice=7000&maxPrice=9000
  
  */

  const filterProducts = async (req, res) => {

    //Desestruturamos estos valores
    const { brand, minPrice, maxPrice } = req.query;
  
    //Crea este objeto vacio que se utilizara para construir las condiciones de filtrado para la consulta a la base de datos
    let whereCondition = {};
  
    //Si brandname esta en los parámetros de de consulta agrega la condicion a wherecondition para filtrar por marca
    if (brand) {
      whereCondition = { ...whereCondition, productbrand: brand };
    }
  
    //Verifica si minPrice y maxPrice estan en los parametros de busqueda
    if (minPrice && maxPrice) {
      whereCondition = {
        //agrega una condición al objeto whereCondition para filtrar por el rango de precios del producto utilizando el operador Op.between proporcionado por Sequelize
        ...whereCondition,
        price: {
          [Op.between]: [parseInt(minPrice), parseInt(maxPrice)],
        },
      };
    }
  
    try {
      const products = await Product.findAll({ where: whereCondition });
  
      if (products.length > 0) {
        return res.status(200).json(products);
      } else {
        return res.json([]);
      }
    } catch (error) {
      return res.status(400).json({ error: 'Error al obtener los productos.' });
    }
  };
  

  


module.exports = {
  filterProductsByPriceRange,
  filterByBrands,
  filterProducts
};

// http://localhost:3004/products/filter?brandName=Nike&minPrice=6000&maxPrice=8000



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