import { NavLink } from "react-router-dom";
import './card.css'

const Card = ({ image, id, name, price , productbrand}) => {
  return (
    <div className="card">
      <NavLink to={`/detail/${id}`}>
        <img className="" src={image} alt={name} width={"300px"} />
        <h4 className="h5">{name}</h4>
        <h3 className="h5">{productbrand}</h3>
        <br />
        <h2 className="h5">$ {price}</h2>
      </NavLink>
    </div>
  );
};

export default Card;
