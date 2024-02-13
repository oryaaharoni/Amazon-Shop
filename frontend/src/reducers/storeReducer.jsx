const storeReducer = (state,action) => {
    switch (action.type) {
      case 'USER_SIGNIN':{
        return {...state, userInfo: action.payload};
    }
    //maybe remove this
      case 'USER_SIGNUP':{
      return {...state, userInfo: action.payload};
    }
      case 'USER_SIGNOUT':{
      return {...state, userInfo: null, cart: {cartItems:[], shippingAddress:{}, paymentMethod:""}};
    }
    case 'ADD_TO_CART':{
      const newItem = action.payload; 
      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id);

      const cartItems = existingItem ? state.cart.cartItems.map((item) =>
          item._id === existingItem._id ? newItem : item ) : [...state.cart.cartItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {...state, cart: {...state.cart, cartItems }};
    }
    case 'REMOVE_FROM_CART':{
      console.log(state.cart.cartItems)
      console.log(action.payload)
      const cartItems = state.cart.cartItems.filter((product)=>product._id !== action.payload._id);
      console.log(cartItems)
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {...state, cart: {...state.cart, cartItems }};
    }
    case 'SAVE_SHIPPING_ADDRESS':{
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
      return {...state, cart: {...state.cart, shippingAddress: action.payload}};
    }
    case 'SAVE_PAYMENT_METHOD':{
      return {...state, cart: {...state.cart, paymentMethod: action.payload}};
    }
    case 'CLEAR_CART':{
      return {...state, cart: {cartItems:[], shippingAddress:{}, paymentMethod:""}};
    }
      default: 
        return {...state};
    }
  }
  
  export default storeReducer;