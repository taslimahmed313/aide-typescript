import { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "../../../assets/images/aide-logo (1).png";
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import "./Navbar.css";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  // const {name} = useContext(AuthContext)
  
  const handleLogOut = () =>{
    logOut()
    .then(()=>{})
    .catch(e => console.log(e))
  }
    return (
      <div className="topnav">
        <nav>
          <Link to="/">
            <h2 className="logo">
              <img src={logo} alt="" />
              ide
            </h2>
          </Link>
          <div >
            <div className="search-container">
                <input type="text" placeholder="Search.." name="search" />
                <button>
                  <FaSearch className='search-icon'></FaSearch>
                </button>
            </div>
          </div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href='#shop'>Shop</a>
            </li>
            {user ? (
              <>
                <li>
                  <Link onClick={handleLogOut}>Log Out</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
};

export default Navbar;