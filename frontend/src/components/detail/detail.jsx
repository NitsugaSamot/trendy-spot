import prendas from "../../../../prendas";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  return (
    <div>
      {prendas.map((prenda) => {
        if (id == prenda.id) {
          return (
            <div>
              <h1>{prenda.name}</h1>
              <img src={prenda.image} alt={prenda.name} />
              <h3>$ {prenda.price}</h3>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Detail;
