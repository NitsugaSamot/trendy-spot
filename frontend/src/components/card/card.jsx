import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ image, id, name, price, brand }) => {
  return (
    <div className="divAllCard">
      <Link to={`/detail/${id}`} className="navLinkCard">
        <div>
          <img src={image} alt={name} width={"200px"} className="imgCard" />
        </div>
        <h3 className="titleCard">{name}</h3>
        <p>{brand}</p>
        <p>$ {price}</p>
      </Link>
    </div>
  );
};

export default Card;
