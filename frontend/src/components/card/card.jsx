import { NavLink } from "react-router-dom";
import "./card.css"

const Card = ({ image, id, name, price }) => {
  return (
    <div className="containerCard">
      <NavLink to={`/detail/${id}`} className="navLinkCard">
        <h1>{name}</h1>
        <img src={image} alt={name} width={"300px"} />
        <h2>$ {price}</h2>
      </NavLink>
    </div>
  );
};

export default Card;
