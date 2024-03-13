import Title from '../components/shared/Title';
import homePageReducer from '../reducers/homePageReducer'
import Loading from '../components/shared/Loading'
import MessageBox from '../components/shared/MessageBox'
import Products from '../components/HomePage/Products';
import { useReducer ,useEffect, axios } from '../import.js';


const initialState = {loading:true, error:"",data:[]};

export const HomePage = () => {

  const [state, dispatch] = useReducer(homePageReducer, initialState);
  const {loading, error, data} = state;

  // use effect= rander the page
  useEffect(() => {
    const getProducts = async() => {

      dispatch({type:"GET_REQUEST"}); 

      try{
      
        const {data} = await axios.get("/api/v1/product");
        dispatch({ type:"GET_SUCCESS" ,payload:data });
      }
      catch (error){
        dispatch({ type:"GET_FAIL" ,payload:error.message });
        
      }
    };
    getProducts();
  },[]);

  return (
    <div> 
      <Title title="Home Page"></Title>
      <div className='backgroundHomePage'>
        <img style={{width:"100%"}} src="https://m.media-amazon.com/images/I/81d5OrWJAkL._SX3000_.jpg" alt="backgroundHomePage"/>
      </div>
      
      <div className='products'>
        {loading? <Loading/> : error ? 
        <MessageBox variant="danger">{error}</MessageBox> :
        <Products products={data}></Products>}
      </div>
    </div>
    
  )
}

