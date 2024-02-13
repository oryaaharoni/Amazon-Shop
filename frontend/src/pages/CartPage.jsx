import { Store } from "../Store";
import Title from "../components/shared/Title";
import ItemsInCart from "../components/CartPage/ItemsInCart";
import {Row,Col , axios,useContext, toast, useNavigate} from '../import.js'
import Checkout from "../components/CartPage/Checkout.jsx";
import {  getError } from "../utils.jsx";

const CartPage = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart } = state;
    const { cartItems } = cart;

    const navigate = useNavigate();

    const updateCartHandler = async (product, quantity) => {
      try{
        const {data} = await axios.get(`/api/v1/product/${product._id}`);

        if (data.countInStock < quantity)
        {
            alert("Sorry, Product is out of stock");
            return;
        }

        ctxDispatch({type:'ADD_TO_CART', payload: {...product, quantity} });
    }
    catch(err){
       toast.error(getError(err));
    }
    }


    const removeCartItemHandler = (product) => {
      ctxDispatch({type: 'REMOVE_FROM_CART',payload: product})
    }


    const checkoutHandler =()=>{
      navigate("/signin?redirect=/shipping")
    }


  return (
    <div>
        <Title title={"Shopping Cart"}></Title>
        <Row>
            <Col md={8}> <ItemsInCart cartItems={cartItems} updateCartHandler={updateCartHandler} removeCartItemHandler={removeCartItemHandler}/> </Col>
            <Col md={4}> <Checkout cartItems={cartItems} checkoutHandler={checkoutHandler}/> </Col>
        </Row>
    </div>
  )
}

export default CartPage