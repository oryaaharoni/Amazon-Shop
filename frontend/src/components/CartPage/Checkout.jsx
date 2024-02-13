import { Button, Card, ListGroup, PropTypes } from '../../import.js';

const Checkout = ({cartItems ,checkoutHandler}) => {
  return (
    <Card>
        <Card.Body>
            <ListGroup>
                <ListGroup.Item>
                    <h3>Subtotal: {" "} { cartItems.reduce((a, c) => a + c.quantity, 0) } ,{" "} 
                     { cartItems.reduce((a, c) => a + c.quantity*c.price, 0).toFixed(2) }$
                    </h3>
                </ListGroup.Item>
              <ListGroup.Item>
                <div className='d-grid'>
                    <Button type="button" disabled={cartItems.length ===0} variant='primary' onClick={()=>checkoutHandler()}>
                        Checkout
                    </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
  )
}
Checkout.propTypes = {cartItems: PropTypes.array, checkoutHandler:PropTypes.func}

export default Checkout