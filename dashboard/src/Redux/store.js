import { createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools } from "redux-devtools-extension";
import { userListReducer, userLoginReducer } from "./Reducers/usersReucer";
import { productListReducer ,productUpdateReducer , productEditReducer,productCreateReducer, productDeleteReducer } from "./Reducers/ProductReducers";
import {orderDeliveredReducer, orderDeatailsReducer,orderListReducer } from "./Reducers/OrderReducer";


const reducer = combineReducers({
    
 userLogin:userLoginReducer,
 userList : userListReducer,
 productList : productListReducer,
 productDelete:productDeleteReducer,
 productCreate:productCreateReducer,
 productEdit:productEditReducer,
 productUpdate:productUpdateReducer,
 orderList:orderListReducer,
 orderDetails : orderDeatailsReducer,
 orderDeliver:orderDeliveredReducer,
});


//login  

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
: null;   


const initialState = {
   

    userLogin:{ userInfo:userInfoFromLocalStorage, },

};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    );


export default store;


