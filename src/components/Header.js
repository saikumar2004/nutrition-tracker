import {UserContext} from "../contexts/UserContext";
import {useContext, useState} from "react";
import {useNavigate, Link} from "react-router-dom";

function Header() {
    const loggedData = useContext(UserContext);
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);

    function logout() {
        localStorage.removeItem("nutrify-user");
        loggedData.setLoggedUser(null);
        navigate("/login");
    }

    function toggleNav() {
        setIsNavOpen(!isNavOpen);
    }

    return (
        <div className="header-con">
            <div className="head">  
                <h1 className="header-title">SparkNutriTrac</h1>
            <button className="nav-toggle-btn" onClick={toggleNav}>
                &#9776;
            </button></div>
          
            <ul className={`header-ul ${isNavOpen ? 'open' : ''}`}>
                <Link to="/home"><li>Home</li></Link>
                <Link to="/track"><li>Track</li></Link>
                <Link to="/diet"><li>Diet</li></Link>
                <Link to="/contact"><li>Contact Us</li></Link>
                <button className="btn header-btn" onClick={logout}>Log out</button>
            </ul>
            
        </div>
    );
}

export default Header;
