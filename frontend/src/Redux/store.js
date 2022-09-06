import { createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools } from "redux-devtools-extension";
import {productCreateReviewReducer, productDetailsReducer, productListReducer } from "./Reducers/ProductReducers";
import { cartReducer } from "./Reducers/CartReducer";
import { userLoginReducer ,userUpdateProfileReducer, userSignupReducer,userDetailsReducer} from "./Reducers/usersReucer";
import { orderListMyReducer ,orderPayReducer, orderCreateReducer , orderDeatailsReducer} from "./Reducers/OrderReducer";
const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer, 
    productReviewCreate :productCreateReviewReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userSignup :userSignupReducer,
    userDetails :userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    orderCreate :orderCreateReducer,
    orderDeatils : orderDeatailsReducer,
    orderPay:orderPayReducer,
    orderListMy : orderListMyReducer,

});
const cartItemsFromLocalStorage = localStorage.getItem("cartItem")
? JSON.parse(localStorage.getItem("cartItem"))
: []

//login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
: null;
//shippingAddress
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
? JSON.parse(localStorage.getItem("shippingAddress"))
: {};

const initialState = {
    cart :{
        cartItems: cartItemsFromLocalStorage,
        shippingAddress : shippingAddressFromLocalStorage,
    },

    userLogin:{
        userInfo:userInfoFromLocalStorage,
    },

};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    );


export default store;


