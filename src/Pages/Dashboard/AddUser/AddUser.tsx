import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./AddUser.css";

const AddUser = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const imageHostKey = "a4aaeaa90358c3b82f8146583ad4c398";

  const handleAddUser = (data: any) => {
    console.log(data);
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
          const userData = {
            name: data.name,
            role: data.role,
            img: imgData.data.url,
            plan: data.plan,
            userName: data.userName,
            status: data.status,
            email: data.email,
          };
          fetch(" https://aide-task-server.vercel.app/allUser", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userData),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              if (result.acknowledged) {
                toast.success("User Add Successfully !!");
                navigate("/dashboard");
              }
            });
        }
      });
  };

  return (
    <div id="addProduct">
      <div className="product-form">
        <h2 id="title">Add Users</h2>

        <form onSubmit={handleSubmit(handleAddUser)}>
          <div id="selected">
            <div>
              <label htmlFor="role">Role</label>
              <select id="role" {...register("role")} required>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Author">Author</option>
                <option value="Maintainer">Maintainer</option>
                <option value="Subscriber">Subscriber</option>
              </select>
            </div>
            <div>
              <label htmlFor="plan">Plan</label>
              <select id="plan" {...register("plan")} required>
                <option value="Enterprise">Enterprise</option>
                <option value="Team">Team</option>
                <option value="Company">Company</option>
                <option value="Basic">Basic</option>
              </select>
            </div>
            <div>
              <label htmlFor="status">Status</label>
              <select id="status" {...register("status")} required>
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="inputbox">
            <input type="file" {...register("img")} required />
          </div>
          <div className="inputbox">
            <input
              type="text"
              {...register("name")}
              required
              placeholder="Full Name"
            />
          </div>
          <div className="inputbox">
            <input
              type="email"
              {...register("email")}
              required
              placeholder="Email"
            />
          </div>
          <div className="inputbox">
            <input
              type="text"
              {...register("userName")}
              required
              placeholder="user_name"
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

export default AddUser;
