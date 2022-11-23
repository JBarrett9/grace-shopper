import { Link } from "react-router-dom";
import "./Header.css";
import pizza_img from "../../images/pizza-g417efaadc_640.png";
const Header = (props) => {
  const { currentUser, setCurrentUser, setToken, setOrder, setOrderId } = props;
  return (
    <>
      <div className="logo">
        <Link to="/">
          <img className="logo-img" src={pizza_img} />
        </Link>
      </div>
      <nav className="head">
        <Link to="/">
          <h1 className="brand">SAUCE BOSS</h1>
        </Link>
        <span className="head-links">
          {currentUser.admin ? <Link to="/admin">ADMIN</Link> : <></>}
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
                setOrderId();
              }}
            >
              LOGOUT
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
