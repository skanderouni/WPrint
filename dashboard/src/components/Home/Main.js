import React,{useEffect} from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";
import ProductsStatistics from "./ProductsStatistics";
import { useDispatch, useSelector } from "react-redux";

import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
const Main = () => {

  const orderList = useSelector((state)=> state.orderList);
  const {loading , error,orders} = orderList;
  const productList = useSelector((state)=> state.productList);
  const {products, countp} = productList;

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>
        {/* Top Total */}
        <TopTotal orders={orders} products={products} countp ={countp}/>

        <div className="row">
          {/* STATICS */}
          <SaleStatistics />
          <ProductsStatistics />
        </div>

        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder orders={orders} loading={loading} error={error} />
        </div>
      </section>
    </>
  );
};

export default Main;
