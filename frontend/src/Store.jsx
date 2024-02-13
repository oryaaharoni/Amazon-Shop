import { createContext} from "react"
import { PropTypes , useReducer} from './import.js'
import storeReducer from "./reducers/storeReducer";

export const Store = createContext();
const initialState = {
    userInfo: localStorage.getItem('userInfo') ? 
        JSON.parse(localStorage.getItem('userInfo')) : null,
    cart: { 
        cartItems: localStorage.getItem('cartInfo') ? 
            JSON.parse(localStorage.getItem('cartInfo')) : [],
            
        shippingAddress: localStorage.getItem('shippingAddress') ? 
            JSON.parse(localStorage.getItem('shippingAddress')) : {},

        paymentMethod:  localStorage.getItem('paymentMethod') ? 
            // JSON.parse- maybe remove
            (localStorage.getItem('paymentMethod')) : ""
    }
};

export const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(storeReducer, initialState );
    const body = {state, dispatch};
    return <Store.Provider value={ body }>{children}</Store.Provider>
}
StoreProvider.propTypes = {children: PropTypes.node}