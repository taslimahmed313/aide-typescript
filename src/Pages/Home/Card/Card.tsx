import { useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import "./Card.css";

type Product = {
  name: string;
  price: number;
  img: string;
};

const Card = ({ img, name, price }: Product) => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div className="card">
        <img src={img} alt="" />
        <h4>{name}</h4>
        <p>{price} Taka</p>

        {count > 0 ? (
          <p className="quantity">
            Quantity:{" "}
            <FaPlusCircle
              className="count-icon"
              onClick={() => setCount(count + 1)}
            />
            {count}
            <FaMinusCircle
              className="count-icon"
              onClick={() => setCount(count - 1)}
            />
          </p>
        ) : (
          <button onClick={() => setCount(count + 1)}>Add To Cart</button>
        )}
      </div>
    </div>
  );
};

export default Card;
