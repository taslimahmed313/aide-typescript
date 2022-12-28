import { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("https://aide-task-server.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setProducts(data);
      });
  }, []);
  console.log(products);

  return (
    <div id="shop">
      <h1 className="product-section">Our Available Products !</h1>

      <div>
        {loading ? (
          <div className="loader">
            {/* <BeatLoader color="#36d7b7" /> */} <div>Loading....</div>
          </div>
        ) : (
          <div className="products">
            {products.map((product: any, i: number) => (
              <Card key={i} {...product}></Card>
            ))}
          </div>
        )}
      </div>

      <footer className="footer">
        Copyright © 2021 aide. All rights reserved.
      </footer>
    </div>
  );
};

export default Products;
