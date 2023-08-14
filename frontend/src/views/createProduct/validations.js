const validation = (form) => {
  console.log(form);
  let errors = {};
  if (!form.name) errors.name = "Write a name";
  else if (form.name.length < 3) errors.name = "Write at least 3 letters";
  else if (form.name.length > 50) errors.name = "Write up to 50 letters";

  const {principal, secundaria} = form.image;
  if(principal === "" || secundaria === "") errors.image = "Image Principal is required";

  if (!form.price) errors.price = "Insert a price";
  else if (form.price < 100 || form.price > 100000)
    errors.price = "The price must be between 100 and 10000";
  else if (isNaN(form.price)) errors.price = "Should be number";

  if(form.principal === "") errors.image = "Image is required";
  if(form.secundaria === "") errors.image = "Image is required";

  if (!form.description) errors.description = "You must write a description";
  else if (form.description.lenght < 10 || form.description.lenght > 400)
    errors.description = "The description must have between 10 and 400 caracters";

  if (!form.brand) errors.brand = "Write a brand";
  else if (form.brand.lenght < 3 || form.brand.lenght > 20)
    errors.brand = "The brand name must have between 3 and 20 caracters";


  // if(form.stock.s.blanco < 1 && form.stock.s.negro < 1 || form.stock.s.gris < 1) errors.stock = "The stock cannot be 0";
   
  // if((form.stock.s.blanco + form.stock.s.negro + form.stock.s.gris) +
  // (form.stock.m.blanco + form.stock.m.negro + form.stock.m.gris) +
  // (form.stock.l.blanco + form.stock.l.negro + form.stock.l.gris) + 
  // (form.stock.xl.blanco + form.stock.xl.negro + form.stock.xl.gris)
  // < 0) errors.stock = "The stock cannot be 0"

  return errors;
};


export default validation;
