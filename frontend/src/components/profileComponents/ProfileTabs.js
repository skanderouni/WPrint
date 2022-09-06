import React , { useEffect }from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import {toast} from "react-toastify";
import { updateUserProfile } from "../../Redux/Actions/usersActions";

const ProfileTabs = () => {
   const [name,setName] =useState("");
   const [adress,setAdress] =useState("");
   const [country,setCountry] =useState("");
   const [postalCode,setPostalCode] =useState("");
   const [phone,setPhone] =useState("");
  const [email,setEmail] =useState("");
  const [password,setPassword] =useState("");
   const [confirmPassword,setConfrmPassword] =useState("");
  const toastId = React.useRef(null);
  const Toastobjects = {
    pauseOnFocusLoss : false ,
    draggable:false,
    pauseOnHover:false,
    autoClose:2000
  };
  
   const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const {loading ,error ,  user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {loading:updateLoading} = userUpdateProfile;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
 
   useEffect(() => {
    if(user) {
      setName(user.name);
      setPassword(user.password);
    };
  },[dispatch,user]);

 const submitHandler =(e) => {
    e.preventDefault();
    //matching password
    if(password !== confirmPassword) {
     toastId.current = toast.error("Passwords do not match !!",Toastobjects);
    }else{
      
  
      dispatch(updateUserProfile({id:userInfo._id,name,email,adress,country,postalCode,phone,password}));
      
      if(!toast.isActive(toastId.current)){
        toastId.current = toast.success("Prpfile Updated", Toastobjects);
      };
    };
   
  };


  return (
    <>
      <Toast/>
       {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
         {updateLoading && <Loading />}
         <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">UserName</label>
            <input className="form-control" type="text" required   onChange={(e)=> setName(e.target.value)}/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">Country</label>
            <input className="form-control" type="text" required   onChange={(e)=> setCountry(e.target.value)}/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">postalCode</label>
            <input className="form-control" type="Number" required   onChange={(e)=> setPostalCode(e.target.value)}/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">phone</label>
            <input className="form-control" type="Number" required   onChange={(e)=> setPhone(e.target.value)}/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">Adress</label>
            <input className="form-control" type="text" required   onChange={(e)=> setAdress(e.target.value)}/>
          </div>
        </div>


        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-email">E-mail Address</label>
            <input className="form-control" type="email" required  onChange={(e)=> setEmail(e.target.value)}/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">New Password</label>
            <input className="form-control" type="password" required  onChange={(e)=> setPassword(e.target.value)}/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Confirm Password</label>
            <input className="form-control" type="password" required  onChange={(e)=> setConfrmPassword(e.target.value)} />
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
