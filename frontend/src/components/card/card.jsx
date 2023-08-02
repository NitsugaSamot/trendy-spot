import { NavLink } from "react-router-dom";

const Card = ({ image, id, name, price }) => {
  return (
    <div>
      <NavLink to={`/detail/${id}`}>
        <h1>{name}</h1>
        <img src={image} alt={name} width={"200px"} />
        <h2>$ {price}</h2>
      </NavLink>
    </div>
  );
};

export default Card;
