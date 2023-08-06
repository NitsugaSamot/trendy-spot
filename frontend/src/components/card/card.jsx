import { NavLink } from "react-router-dom";
import './card.css'

const Card = ({ image, id, name, price , productbrand}) => {
  return (
    <div className="card">
      <NavLink to={`/detail/${id}`}>
        <h1 className="titleCard">{name}</h1>
        <img src={image} alt={name} width={"300px"} />
        <h2>$ {price}</h2>
        <h3>{productbrand}</h3>
      </NavLink>
    </div>
  );
};

export default Card;
