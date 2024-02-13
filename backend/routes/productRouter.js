import express from 'express';
import { getProducts, getProductById ,getProductByToken, getCategories, getProductsBySearch} from '../controllers/productController.js';
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();

productRouter.get('/',getProducts);
productRouter.get('/search',expressAsyncHandler(getProductsBySearch));
productRouter.get('/categories',getCategories);

productRouter.get('/token/:token',getProductByToken);
productRouter.get('/:id',getProductById);

export default productRouter;