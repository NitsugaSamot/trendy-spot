const validation = (form) => {
  let errors = {};
  if (!form.name) errors.name = "Write a name";
  else if (form.name.length < 3) errors.name = "write at least 3 letters";
  else if (form.name.length > 50) errors.name = "write up to 50 letters";
  if (!form.price) errors.price = "insert a price";
  else if (form.price < 100 || form.price > 100000)
    errors.price = "the price must be between 100 and 10000";
  else if (isNaN(form.price)) errors.price = "Should be number";
  if (!form.image) errors.image = "You must provide an image";
  if (!form.description) errors.description = "You must write a description";
  else if (form.description.lenght < 10 || form.description.lenght > 200)
    errors.description =
      "the description must have between 10 and 200 caracters";
  if (!form.stock) errors.stock = "You must insert the stock available";
  else if (isNaN(form.stock)) errors.stock = "Should be number";
  else if (form.stock < 1 || form.stock > 1000)
    errors.stock = "the stock must be between 1 and 1000";
  if (!form.color) errors.color = "Choose a color";
  else if (form.color.lenght < 3 || form.color.lenght > 20)
    errors.color = "the color must be between 3 and 20 caracters";
  if (!form.brand) errors.brand = "Write a brand";
  else if (form.brand.lenght < 3 || form.brand.lenght > 20)
    errors.brand = "the brand name must have between 3 and 20 caracters";

  return errors;
};

export default validation;
