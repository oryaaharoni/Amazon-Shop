import Product from './Product'
import { PropTypes, Row , Col  } from '../../import.js'

const Products = ({products}) => {
  return (
    <Row>
        {products.map((product) =>(
            //הקארדים שהמסך מתחלק בהם
            //  במסכים גדולים ניראה 3 קארדיםת במסכים קטנים נראה 4 קארדים ובמסכים ממש ממש קטנים ניראה 6 קארדים
            <Col key={product.token} lg={3} md={4} sm={6} xs={12}>
                <Product product={product}/>
            </Col>
        ))}
    </Row>
  )
}
Products.propTypes ={products: PropTypes.array}
export default Products