import React, {useState} from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { listProducts } from "./Redux/Actions/ProductActions";
import { listOrders } from "./Redux/Actions/OrderActions";
import { listUser } from "./Redux/Actions/usersActions";

function App() {
const dispatch = useDispatch();

const userLogin = useSelector((state)=> state.userLogin);
    const {userInfo} = userLogin;

     useEffect(()=> {
     if (userInfo && userInfo.isAdmin) {
       
    dispatch(listUser("",""));
       dispatch(listProducts("",""));
       dispatch(listOrders());
     };
    },[dispatch,userInfo]);


  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
           <Route path="/users/all/search/:keyword" component={UsersScreen} />
           <Route path="/users/all/page/:pagenumber" component={UsersScreen}  />    
            <Route path="/users/all/search/:keyword/page/:pagenumber" component={UsersScreen} />
       <Route path="/products/search/:keyword" component={ProductScreen} />
           <Route path="/products/page/:pagenumber" component={ProductScreen}  />    
            <Route path="/products/search/:keyword/page/:pagenumber" component={ProductScreen} />
          <PrivateRouter path="/products" component={ProductScreen} />
          <PrivateRouter path="/category" component={CategoriesScreen} />
          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
          <PrivateRouter path="/addproduct" component={AddProduct} />
          <PrivateRouter path="/users/all" component={UsersScreen} />
          <PrivateRouter path="/product/:id/edit" component={ProductEditScreen} />
          <Route path="/login" component={Login} />
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
