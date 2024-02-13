import { Button, Card, Col, ListGroup, Row ,PropTypes} from '../../import.js';
import Loading from './Loading.jsx';

export const PaymentSummary = ({loading, cart, status, submitOrderHandler}) => {
  return (
    <div><Card>
        <Card.Header>
            <Card.Title>Payment Summary</Card.Title>
        </Card.Header>
        <Card.Body>
            <ListGroup>
                <ListGroup.Item>
                    <Row>
                        <Col>Items Price: </Col>
                        <Col>${cart.itemsPrice.toFixed(2)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping Price: </Col>
                        <Col>${cart.shippingPrice.toFixed(2)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Tax Price: </Col>
                        <Col>${cart.taxPrice.toFixed(2)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Total Price: </Col>
                        <Col><strong>${cart.totalPrice.toFixed(2)}</strong></Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
            <br/>
            {status === 'submitOrder' && <Button variant='primary' onClick={submitOrderHandler}>Submit</Button>}
            {loading && <Loading></Loading>}
        </Card.Body>
        </Card></div>
  )
}

PaymentSummary.propTypes = {
    loading: PropTypes.bool,
    cart: PropTypes.object,
    status: PropTypes.string,
    submitOrderHandler: PropTypes.func
}
export default PaymentSummary