import { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event: any) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result: any) => {
        const user = result.user;
        console.log(user);
        form.reset();
        toast.success("Successfully Login !!");
        navigate(from, { replace: true });
      })
      .catch((e: any) => {
        console.log(e);
        toast.error(e.message);
      });
  };
  return (
    <div id="signup">
      <div>
        <div className="center">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <div className="inputbox">
              <input type="email" required name="email" />
              <span>Email</span>
            </div>
            <div className="inputbox">
              <input type="password" required name="password" />
              <span>Password</span>
            </div>
            <div className="button">
              <input type="submit" value="Login" />
            </div>
            <p className="auth">
              New to Aide solutions ltd? please <Link to="/signup">Signup</Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
