import Rating from '../shared/Rating'
import { PropTypes, Card , Button , Link ,useContext } from '../../import.js'
import { Store } from '../../Store.jsx'
import { addToCartHandler } from "../../utils.jsx";

const Product = ({product}) => {

  const { state, dispatch: ctxDispatch} = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;

  return (
    <Card className='product-card mb-4'>
        <Link to={`/product/${product.token}`}>
            <Card.Img variant='top' src={product.image} alt={product.title}/>
        </Link>
        <Card.Body className='card-body'>
            <Link to={`/product/${product.token}`}>
                <Card.Title>{product.title}</Card.Title>
            </Link>
        </Card.Body>
        <Rating rating={product.rating.rate} numReviews={product.rating.count}/>
        <Card.Text> $ {product.price}</Card.Text>
        {product.countInStock===0 ? <Button variant='light' disabled>Out Of Stock</Button> : 
        <Button className='btn-primary' onClick={()=> addToCartHandler(product, cartItems, ctxDispatch)}>Add To Cart</Button>}
    </Card>
  )
}

Product.propTypes ={product: PropTypes.object}
export default Product