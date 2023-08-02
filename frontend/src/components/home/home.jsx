import Card from "../card/card";
import prendas from "../../../../prendas.js";
const Home = () => {
  return (
    <div>
      {prendas.map((prenda) => {
        return (
          <Card
            key={prenda.id}
            id={prenda.id}
            name={prenda.name}
            image={prenda.image}
            price={prenda.price}
          />
        );
      })}
    </div>
  );
};

export default Home;
