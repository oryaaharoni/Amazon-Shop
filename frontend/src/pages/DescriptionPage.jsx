import { useNavigate, useParams, useContext, useEffect, axios, Row, Col, useReducer} from "../import.js";
import { addToCartHandler, getError } from "../utils.jsx";
import Loading from "../components/shared/Loading.jsx";
import MessageBox from "../components/shared/MessageBox.jsx";
import descriptionPageReducer from "../reducers/descriptionPageReducer.jsx";
import Title from "../components/shared/Title.jsx";
import ProductDescription from "../components/DescriptionPage/productDescription.jsx";
import { Store } from "../Store.jsx";
import CartDescription from "../components/DescriptionPage/cartDescription.jsx";

const initialState = { loading: true, error: "", data: [] };

const DescriptionPage = () => {
  const [{ loading, error, data }, dispatch] = useReducer(
    descriptionPageReducer,
    initialState
  );
  
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: "GET_REQUEST" });

      try {
        const { data } = await axios.get(`/api/v1/product/token/${token}`);
        dispatch({ type: "GET_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "GET_FAIL", payload: getError(error) });
      }
    };
    getProduct();
  }, [token]);

  const addToCart = async () => {
    await addToCartHandler(data, cartItems, ctxDispatch);
    navigate("/cart");
  };

  return (
    <div>
      <Title title={data.title} />
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger"> {error} </MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img width={400} src={data.image} alt={data.title}></img>
            </Col>
            <Col md={3}>
              <ProductDescription {...data}/>
            </Col>
            <Col md={3} >
              <CartDescription addToCart={addToCart} product={data}/>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default DescriptionPage;
