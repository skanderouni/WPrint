import React from "react";
import Orders from "./Orders";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { listOrders } from "../../Redux/Actions/OrderActions";


const OrderMain = () => {



 const dispatch = useDispatch();
    

    const orderList = useSelector((state)=> state.orderList);
    const {loading , error,orders} = orderList;

   

  useEffect(()=> {
     dispatch(listOrders());
  },[dispatch]);





    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Orders</h2>
            </div>

            <div className="card mb-4b shadow-sm">
                <header className="card-header bg-white">
                    <div className="row gx-3 py-3">
                        
                       
                    </div>
                </header>
                <div className="card-body">
                    <div className="table-responsive">
                        {
                            loading ?
                            (
                            <Loading />
                            ) 
                            : error ?
                            (
                            <Message variant="alert-danger">{error}</Message>
                            )
                            :
                            (
                             <Orders orders={orders}/>
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderMain;