import { Card, PropTypes ,Link, ListGroup, Row, Col} from '../../import.js';
import MessageBox from './MessageBox.jsx';

const OrderSummary = ({cart, status ,isDeliverd}) => {

    // status is null ? 
  return (
    <div>
        <Card className='mb-3'>
            <Card.Header>
                <Card.Title>Shipping Address</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {/* strong-מלל עם דגש */}
                    <strong>Name: </strong>
                    {cart.shippingAddress.fullName} <br/>
                    <strong>Address: </strong>
                    {cart.shippingAddress.address} <br/>
                    <strong>City: </strong>
                    {cart.shippingAddress.city} <br/>
                    <strong>Country: </strong>
                    {cart.shippingAddress.country} <br/>
                    <strong>Postal Code: </strong>
                    {cart.shippingAddress.postalCode}
                </Card.Text>
                { status === "submitOrder" ? <Link to="/shipping">Edit</Link> : 
                    isDeliverd ? <MessageBox variant="success">Sent</MessageBox> :
                    <MessageBox variant="danger">Not Sent</MessageBox> }
            </Card.Body>
        </Card>
        <Card className='mb-3'>
            <Card.Header>
                <Card.Title>Payment Method</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <strong>Method: </strong>
                    {cart.paymentMethod}
                </Card.Text>
                { status === "submitOrder" ? <Link to="/payment">Edit</Link> : 
                    status === "details-unpaid" ? <MessageBox variant="danger">Not Paid</MessageBox> :
                    <MessageBox variant="success">paid</MessageBox> }
            </Card.Body>
        </Card>
        <Card className='mb-3'>
            <Card.Header>
                <Card.Title>Items: </Card.Title>
            </Card.Header>
            <Card.Body>
                <ListGroup>
                    {cart.cartItems.map((item) =>(
                        <ListGroup.Item key={item._id}>
                            <Row>
                                <Col md={3}>
                                    <img src={item.image} alt={item.title} className='img-fluid rounded img-thumbnail'/>
                                </Col>
                                <Col md={5}>
                                    <Link to={`/product/${item.token}`}>{item.title}</Link>
                                </Col>
                                <Col md={2}><strong>Quantity: </strong><span>{item.quantity}</span></Col>
                                <Col md={2}>{item.price}$</Col>
                            </Row>
                        </ListGroup.Item>
                    ))}                     
                </ListGroup>
                {status ==="submitOrder" && <Link to="/cart">Edit </Link>}
            </Card.Body>
        </Card>
    </div>
  )
}

OrderSummary.propTypes ={
    cart: PropTypes.object,
    status: PropTypes.string,
    isDeliverd: PropTypes.bool
}
export default OrderSummary