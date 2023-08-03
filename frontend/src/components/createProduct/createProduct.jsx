import { useState } from "react";

const CreateProduct = () => {
  const [form, setForm] = useState();

const sizes = [
  "S",
  "M",
  "L",
  "XL",
  "XXL",
];


  return (
    <div>
      <form action="">
        <label htmlFor="" name="name"></label>
        <input type="text" value={form.name} />
        <p></p>
        <label htmlFor="" name="size"></label>
        <select onChange={selectType1}>
          {sizes.map((size) => (
            <option key={size} name={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <p></p>
        <label htmlFor="" name="price"></label>
        <input type="text" value={form.price} />
        <p></p>
        <label htmlFor=""></label>
        <input type="text" value={form.image} />
        <p></p>
        <label htmlFor="" name=""></label>
        <input type="text" value={form.description} />
        <p></p>
        <label htmlFor="" name=""></label>
        <input type="text" value={form.stock} />
        <p></p>
        <label htmlFor="" name=""></label>
        <input type="text" value={form.color} />
        <p></p>
      </form>
    </div>
  );
};
export default CreateProduct;