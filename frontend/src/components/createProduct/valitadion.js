
const validation = (form)=>{
    let errors = {};
    if (!form.name) err.name = "Write a name";
    else if (form.name.length < 3) errors.name = "write at least 3 letters";
    else if (form.name.length > 50) errors.name = "write up to 50 letters";
    if (!form.price) errors.price = 'insert a price'
    else if (form.price < 100 || form.price > 100000 ) errors.price = 'the price must be between 100 and 10000'
    else if (isNaN(form.price)) errors.name = "Should be number";
}