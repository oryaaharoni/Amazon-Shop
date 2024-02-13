import { useState ,useContext, useNavigate, useEffect, toast, Row, Col, axios} from '../import.js';
import { Store } from '../Store.jsx';
import { getError } from '../utils.jsx';
import Title from '../components/shared/Title.jsx';
import CheckoutSteps from '../components/shared/CheckoutSteps.jsx';
import OrderSummary from '../components/shared/OrderSummary.jsx';
import PaymentSummary from '../components/shared/PaymentSummary.jsx';

const SubmitOrderPage = () => {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart , userInfo } = state;
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!cart.paymentMethod){
            navigate("/payment");
        }
    });

    const submitOrderHandler = async () => {
        try {
            setLoading(true);
            const orderData= {orderItems: cart.cartItems, shippingAddress: cart.shippingAddress, paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice, shippingPrice: cart.shippingPrice, taxPrice: cart.taxPrice,totalPrice: cart.totalPrice}
            // bearer- סוג התוקן שאנחנו אומרים לשרת לקחת
            const { data } = await axios.post("/api/v1/orders",orderData, {headers: {authorization:`Bearer ${userInfo.token}`}});
            ctxDispatch({type:'CLEAR_CART'});
            localStorage.removeItem('cartItems');
            navigate(`/orders/${data.order._id}`)

        } catch (error) {
           toast.error(getError(error));
        }
        finally{
            setLoading(false);
        }
    };

    // number.EPSILON- some number- read about it
    const round2 = (number) => Math.round(number * 100 + Number.EPSILON) / 100;

    cart.itemsPrice = round2(
        cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
      );
      cart.taxPrice = round2(cart.itemsPrice * 0.17);
      cart.shippingPrice =
        cart.itemsPrice > 50
          ? round2(cart.itemsPrice * 0.1)
          : round2(cart.itemsPrice * 0.02);
      cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  return (
    <div>
        <Title title="Order Summary"/>
        <CheckoutSteps step1 step2 step3 step4/>
        <h1 className='my-3'>Order Summary</h1>
        <Row>
            <Col md={8}> <OrderSummary cart={cart} status={"submitOrder"}/> </Col>
            <Col md={4}> <PaymentSummary loading={loading} submitOrderHandler={submitOrderHandler} status={"submitOrder"} cart={cart}/></Col>
        </Row>

    </div>
  )
}

export default SubmitOrderPage;