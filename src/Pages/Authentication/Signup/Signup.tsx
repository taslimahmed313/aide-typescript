import { useContext, useState } from "react";
// import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import "./Signup.css";

const Signup = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [error, setError] = useState("");

  const handleSignup = (event: any) => {
    event.preventDefault();
    setError("");
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setError("Password Must be 6 Character");
    }

    createUser(email, password)
      .then((result: any) => {
        const user = result.user;

        const profile = { displayName: name };
        updateUser(profile)
          .then(() => {
            saveUserData(name, email);
            //  setLoading(false)
            form.reset();
            // toast.success("Sign Up Successfully");
            navigate(from, { replace: true });
          })
          .catch((e: any) => console.log(e));
        console.log(user);
      })
      .catch((e: any) => {
        console.error(e);
        // toast.error(e.message);
      });
  };

  const saveUserData = (name: string, email: string) => {
    const user = { name, email, role: "user" };
    fetch("https://aide-task-server.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div id="signup">
      <div>
        <div className="center">
          <h1>Sign Up</h1>
          <form onSubmit={handleSignup}>
            <div className="inputbox">
              <input type="text" required name="name" />
              <span>Name</span>
            </div>
            <div className="inputbox">
              <input type="email" required name="email" />
              <span>Email</span>
            </div>
            <div className="inputbox">
              <input type="password" required name="password" />
              <span>Password</span>
            </div>
            <p className="error">{error && error}</p>
            <div className="button">
              <input type="submit" value="Sign Up" />
            </div>
            <p className="auth">
              Already have an account? please <Link to="/login">Login</Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
