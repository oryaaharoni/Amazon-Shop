import { useEffect, useNavigate ,useContext, Container,Form, Button} from '../import.js';
import Title from '../components/shared/Title.jsx';
import CheckoutSteps from '../components/shared/CheckoutSteps.jsx';
import { Store } from '../Store.jsx';

const ShippingPage = () => {

    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch } = useContext(Store);
    const {userInfo, cart : { cartItems }  } = state;


    useEffect(() => {
        if (cartItems.length === 0){
            navigate("/");
        }

        if (!userInfo){
            navigate("/signin?redirect=/shipping");
        }
    },[cartItems.length, navigate, userInfo]);


    const submitHandler= (e) =>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        ctxDispatch({type: 'SAVE_SHIPPING_ADDRESS', payload: data});
        navigate('/payment');
    }

  return (
    <div>
        <Title title="Shipping Page"></Title>
        <CheckoutSteps step1 step2 />
        <Container className='small-container'>
            <h1>Shipping Address:</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Full Name:</Form.Label>
                    <Form.Control name="fullName" required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control name="address" required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>City:</Form.Label>
                    <Form.Control name="city" required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Postal Code:</Form.Label>
                    <Form.Control name="postalCode" required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Country:</Form.Label>
                    <Form.Control name="country" required></Form.Control>
                </Form.Group>
                <div className='mb-3'>
                    <Button variant='primary' type='submit'>Continue</Button>
                </div>
            </Form>
        </Container>
    </div>
  )
}

export default ShippingPage