const validation = (req, res, next) => {
  const { name, price, image, description, stock, brand } =
    req.body;

  if (!name) return res.status(400).json({ error: "Write a name" });
  else if (name.length < 3)
    return res.status(400).json({ error: "Write at least 3 letters" });
  else if (name.length > 50)
    return res.status(400).json({ error: "Write up to 50 letters" });

  if (!price || isNaN(price)) return res.status(400).json({ error: "Insert a price" });
  else if (price < 100 || price > 100000)
    return res
      .status(400)
      .json({ error: "the price must be between 100 and 100000" });
  else if (isNaN(price))
    return res.status(400).json({ error: "Should be a number" });
  
    if (!description)
      return res.status(400).json({ error: "You must write a description" });
    else if (description.length < 10 || description.length > 200)
      return res
        .status(400)
        .json({
          error: "The description must have between 10 and 200 caracters",
        });

  if (!image) res.status(400).json({ error: "You must provide an image" });

  if (!stock)
    return res
      .status(400)
      .json({ error: "You must insert to stock available" });
  else if (isNaN(stock))
    return res.status(400).json({ error: "Should be a number" });
  else if (stock < 1 || stock > 1000)
    return res
      .status(400)
      .json({ error: "The stock must be between 1 and 1000" });

  if (!brand) return res.status(400).json({ error: "Write a brand" });
  else if (brand.length < 3 || brand.length > 20)
    return res
      .status(400)
      .json({ error: "The brand must have be between 3 and 20 caracters" });

  next();
};

module.exports = validation;

// const validation = (form) => {
//   let errors = {};
//   if (!form.name) errors.name = "Write a name";
//   else if (form.name.length < 3) errors.name = "write at least 3 letters";
//   else if (form.name.length > 50) errors.name = "write up to 50 letters";

//   if (!form.price) errors.price = "insert a price";
//   else if (form.price < 100 || form.price > 100000)
//     errors.price = "the price must be between 100 and 10000";
//   else if (isNaN(form.price)) errors.name = "Should be number";

//   if (!form.image) errors.image = "You must paste the image";

//   if (!form.description) errors.description = "You must write a description";
//   else if (form.description < 10 || form.description > 200)
//     errors.description = "the description must have between 10 and 200 caracters";

//   if (!form.stock) errors.stock = "You must insert the stock available";
//   else if (isNaN(form.stock)) errors.stock = "Should be number";
//   else if (form.stock < 1 || form.stock > 1000)
//     errors.stock = "the stock must be between 1 and 1000";

//   if (!form.color) errors.color = "Choose a color";
//   else if (form.color < 3 || form.color > 20)
//     errors.color = "the stock must be between 3 and 20";

//   if (!form.brand) errors.brand = "Write a brand";
//   else if (form.brand < 3 || form.brand > 20)
//         errors.brand = "the brand name must have between 3 and 20";

//     return errors;
// };
