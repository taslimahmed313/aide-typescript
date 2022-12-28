import { FaCartPlus, FaHome, FaRegClipboard, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Collapse.css";

const Collapse = () => {
  function show() {
    document.getElementById("toggle").classList.toggle("active");
    document.getElementById("sidebar").classList.toggle("active");
  }
  function remove(e) {
    if (e.target.id !== "sidebar" && e.target.id !== "toggle") {
      document.getElementById("toggle").classList.remove("active");
      document.getElementById("sidebar").classList.remove("active");
    }
  }
  return (
    <div>
      <div id="toggle" onClick={show}></div>
      <div id="sidebar" onClick={remove}>
        <ul>
          <li>
            <Link className="icon-alignment" to="/">
              <FaHome className="table-icon"></FaHome> Home
            </Link>
          </li>
          <li>
            <Link className="icon-alignment" to="/dashboard">
              <FaRegClipboard className="table-icon"></FaRegClipboard> All Users
            </Link>
          </li>
          <li>
            <Link className="icon-alignment" to="/dashboard/addUser">
              <FaRegUser className="table-icon"></FaRegUser> Add User
            </Link>
          </li>
          <li>
            <Link className="icon-alignment" to="/dashboard/addProduct">
              <FaCartPlus className="table-icon"></FaCartPlus> Add Product
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Collapse;
