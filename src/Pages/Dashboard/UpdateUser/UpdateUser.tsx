import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import "./UpdateUser.css";

const UpdateUser = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [showImage, setShowImage] = useState();

  const user: any = useLoaderData();

  //   const [ImageUrl, setImageUrl] = useState();

  const imageHostKey = "a4aaeaa90358c3b82f8146583ad4c398";

  //   function handleBlur(e) {
  //     setImageUrl(URL.createObjectURL(e.target.files[0]));
  //   }

  const handleOnBlurImage = (data: any) => {
    // console.log(event.target.files[0])
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
          setShowImage(imgData.data.url);
        }
      });
  };

  const handleUpdateUser = (data: any) => {
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
          fetch(` https://aide-task-server.vercel.app/allUser/${user._id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userData),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              if (result.modifiedCount > 0) {
                toast.success("Data Updated Successfully !!");
                navigate("/dashboard");
              }
            });
        } else {
          const userData = {
            name: data.name,
            role: data.role,
            img: user.img,
            plan: data.plan,
            userName: data.userName,
            status: data.status,
            email: data.email,
          };
          fetch(` https://aide-task-server.vercel.app/allUser/${user._id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userData),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              if (result.modifiedCount > 0) {
                toast.success("Data Updated Successfully !!");
                navigate("/dashboard");
              }
            });
        }
      });
  };
  return (
    <div>
      <div id="addProduct">
        <div className="product-form">
          <h2 className="add-title">Update User</h2>

          <form>
            <div className="input-file">
              <div className="inputbox">
                <input
                  type="file"
                  {...register("img")}
                  onBlur={handleSubmit(handleOnBlurImage)}
                />
              </div>
              <div className="update-img">
                {showImage ? (
                  <img src={showImage} alt="" />
                ) : (
                  <img src={user.img} alt="" />
                )}
              </div>
            </div>
          </form>

          <form onSubmit={handleSubmit(handleUpdateUser)}>
            <div id="selected">
              <div>
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  defaultValue={user.role}
                  {...register("role")}
                  required
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Author">Author</option>
                  <option value="Maintainer">Maintainer</option>
                  <option value="Subscriber">Subscriber</option>
                </select>
              </div>
              <div>
                <label htmlFor="plan">Plan</label>
                <select
                  id="plan"
                  defaultValue={user.plan}
                  {...register("plan")}
                  required
                >
                  <option value="Enterprise">Enterprise</option>
                  <option value="Team">Team</option>
                  <option value="Company">Company</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>
              <div>
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  {...register("status")}
                  required
                  defaultValue={user.status}
                >
                  <option value="Pending">Pending</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="inputbox">
              <input
                type="text"
                {...register("name")}
                required
                placeholder="Full Name"
                defaultValue={user.name}
              />
            </div>
            <div className="inputbox">
              <input
                type="email"
                {...register("email")}
                required
                placeholder="Email"
                defaultValue={user.email}
              />
            </div>
            <div className="inputbox">
              <input
                type="text"
                {...register("userName")}
                required
                placeholder="user_name"
                defaultValue={user.userName}
              />
            </div>
            <div className="button">
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
