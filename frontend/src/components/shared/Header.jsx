import SearchBox from "./SearchBox";
import { Link, LinkContainer, Container, NavBar,useContext ,NavDropdown ,Badge} from "../../import.js";
import { Store } from "../../Store.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { state,  dispatch: ctxDispatch} = useContext(Store);
  const { userInfo, cart: {cartItems}} = state;

  const navigate = useNavigate();
  const location = useLocation();

  const signOutHandler = () => {
    ctxDispatch({type: 'USER_SIGNOUT'});
    
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
   
  }

  return (
    <div>
      {/* bg=background variant=  */}
      <NavBar bg="dark" variant="dark">
        <Container>
          <Link onClick={() => navigate(-1)}>
                            {location.pathname !== '/' && <i className="fa fa-arrow-left text-white align-arrow-right">Back</i>}
          </Link>
          {/* to= like click  ---- icon */}
          <LinkContainer to="/">
            {/*brand= אחראי לסמל של החברה שלך כביכול  */}
            <NavBar.Brand>
              <img
                src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"
                width={80}
              />
            </NavBar.Brand>
          </LinkContainer>
          <SearchBox></SearchBox>
          <nav className="d-flex align-items-center-justify-content-end me-2 ms-4">
            <Link to="/cart" className="nav-link">
              <i className="fas fa-shopping-cart text-white"></i>
              {cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
          </nav>
          {/* sign in in the nav bar */}
          {userInfo ? (
            <NavDropdown className="text-white" title={userInfo.name}>
              <NavDropdown.Divider />
              <Link to="#signout" className="dropdown item" onClick={signOutHandler}>
                Sign-Out
              </Link>
            </NavDropdown>
          ) : (
            <Link to="/signin" className="text-white nav-link">
              Sign-In
            </Link>
          )}
        </Container>
      </NavBar>
    </div>
  );
};

export default Header;
