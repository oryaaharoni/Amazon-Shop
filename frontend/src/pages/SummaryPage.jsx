import { useEffect } from "react";
import { Store } from "../Store";
import OrderSummary from "../components/shared/OrderSummary"
import PaymentSummary from "../components/shared/PaymentSummary";
import Title from "../components/shared/Title"
import { Row, Col,useContext, useParams, useState, axios} from '../import.js';

const SummaryPage = () => {

    const { id } = useParams();
    const [ cart, setCart ] = useState({cartItems:[],shippingAddress:{},paymentMethod:"",itemsPrice:0,
        taxPrice:0,shippingPrice:0,totalPrice:0})

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;


  useEffect(() => {
    console.log("id ", id);
    console.log("userInfo.token ",userInfo.token)
    const getOrder = async () => {
    
        console.log("ttttttttttttttttttt")
        try {
            console.log("userInfo ", userInfo)
            const { data } = await axios.get(`/api/v1/orders/${id}`, {headers: {authorization:`Bearer ${userInfo.token}`}});
            console.log("data", data);

            setCart({cartItems: data.order.cartItems, shippingAddress: data.order.shippingAddress, 
                paymentMethod: data.order.paymentMethod,
                itemsPrice: data.order.itemsPrice, shippingPrice: data.order.shippingPrice, 
                taxPrice: data.order.taxPrice, totalPrice: data.order.totalPrice})
           
            console.log("cart " ,cart);
        } 
        catch (error) {
            console.log(error.message);
        }
    };
    getOrder();
  }, [id, userInfo, cart]);



  return (
    <div>
        <Title title="Summary Page"/>
        <h1>order: {id} </h1>
        <Row>
            <Col md={8}>
                <OrderSummary cart={cart} status={"details-unpaid"} isDeliverd={false}></OrderSummary>
            </Col>
            <Col md={4}>
                <PaymentSummary cart={cart} status={"details-unpaid"}></PaymentSummary>
            </Col>
       </Row>
       
    </div>
  )
}

export default SummaryPage