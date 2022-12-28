import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

const AddProduct = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const imageHostKey = "a4aaeaa90358c3b82f8146583ad4c398";

  const handleAddCard = (data: any) => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          console.log(imgData.data.url);
          const productData = {
            name: data.name,
            price: data.price,
            img: imgData.data.url,
          };

          fetch("https://aide-task-server.vercel.app/products", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(productData),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              if (result.acknowledged) {
                toast.success("Item Added Successfully !!");
                navigate("/");
              }
            });
        }
      });
  };
  return (
    <div id="addProduct">
      <div className="product-form">
        <h2 id="product-title">Add Product</h2>

        <form onSubmit={handleSubmit(handleAddCard)}>
          <div className="inputbox">
            <input type="file" {...register("img")} required />
          </div>
          <div className="inputbox">
            <input
              type="text"
              {...register("name")}
              required
              placeholder="item name"
            />
          </div>
          <div className="inputbox">
            <input
              type="text"
              {...register("price")}
              required
              placeholder="item price"
            />
          </div>
          <div className="button">
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
