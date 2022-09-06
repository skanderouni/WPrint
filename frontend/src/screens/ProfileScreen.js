import React, { useEffect }  from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import Message from "../components/LoadingError/Error";
//import Loading from "../components/LoadingError/Loading";
import Header from "../components/Header";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import Orders from "./../components/profileComponents/Orders";
import moment from "moment" ;
import { getUserDetails } from "../Redux/Actions/usersActions";
import {listMyOrders} from "../Redux/Actions/OrderActions";





const ProfileScreen = () => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  const { userinfo } = userDetails;
   const orderListMy = useSelector((state) => state.orderListMy);
  const { loading,error,orders } = orderListMy;
  useEffect(() => {
    dispatch(listMyOrders());
    dispatch(getUserDetails());
    console.log(userinfo)
  },[ ]);

  return (
    <>
      <Header />
       
      <div className="container mt-lg-5 mt-3">
        <div className="row align-items-start">
          <div className="col-lg-4 p-0 shadow ">
            <div className="author-card pb-0 pb-md-3">
              <div className="author-card-cover"></div>
              <div className="author-card-profile row">
                <div className="author-card-avatar col-md-5">
                  <img src="./images/user.png" alt="userprofileimage" />
                </div>
                <div className="author-card-details col-md-7">
                  <h5 className="author-card-name mb-2">
                    <strong>{userinfo&&userinfo.name}</strong>
                  </h5>
                  
                
                  <h6>{userinfo&&userinfo.adress}</h6>
                  <h6>{userinfo&&userinfo.country}</h6>
                  <h6>{userinfo&&userinfo.postalCode}</h6>
                  <h6>{userinfo&&userinfo.phone}</h6>
                  <span className="author-card-position">
                    <>Joined {moment(userinfo&&userinfo.createdAt).format('LL')} </>
                  </span>
                </div>
              </div>
            </div>
            <div className="wizard pt-3 ">
              <div className="d-flex align-items-start">
                <div
                  className="nav align-items-start flex-column col-12 nav-pills me-3 "
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    Profile Settings
                  </button>
                  <button
                    className="nav-link d-flex justify-content-between"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Orders List
                    <span className="badge2">{
                      orders ? orders.length : 0 
                    }</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* panels */}
          <div
            className="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
            id="v-pills-tabContent"
          >
            <div
              className="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <ProfileTabs />
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <Orders orders={orders} loading = {loading} error ={error} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
