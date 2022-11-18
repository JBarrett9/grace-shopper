import { Link } from "react-router-dom";
import "./Header.css";
import pizza_img from "../../images/pizza-g417efaadc_640.png";
const Header = (props) => {
  const { currentUser, setCurrentUser, setToken, setOrder, setOrderId } = props;
  return (
    <>
      <div className="logo">
        <img className="logo-img" src={pizza_img} />
      </div>
      <nav className="head">
        <Link to="/">
          <h1 className="brand">Sauce Boss</h1>
        </Link>
        <span className="head-links">
          {typeof props.currentUser.email === "string" &&
          props.currentUser.email.includes("saucebossguest.com") ? (
            <>
              <Link to="/register">SIGN UP</Link>
              <Link to="/login">LOG IN</Link>
            </>
          ) : (
            <Link
              to="/"
              onClick={() => {
                localStorage.clear();
                setCurrentUser({});
                setToken("");
                setOrder([]);
              }}
            >
              LOGOUT ({currentUser.email})
            </Link>
          )}
          <Link
            to="/cart"
            data-num={props.numItems}
            className="material-symbols-outlined badge"
          >
            shopping_cart
          </Link>
        </span>
      </nav>
    </>
  );
};
export default Header;
