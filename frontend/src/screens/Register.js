import React , { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import Header from "./../components/Header";
import { signup } from "../Redux/Actions/usersActions";

const Register = (location,history) => {
  window.scrollTo(0, 0);
  const [name,setName] =useState("");
  const [email,setEmail] =useState("");
  const [adress,setAdress] =useState("");
  const [country,setCountry] =useState("");
  const [postalCode,setPostalCode] =useState("");
  const [phone,setPhone] =useState("");
  const [password,setPassword] =useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const userSignup = useSelector((state) => state.userSignup);
  const {error , loading , userInfo } = userSignup;
    useEffect(() => {
    if(userInfo) {
      history.push(redirect);
    };
  },[userInfo , history , redirect]);

  const submitHandler =(e) => {
    e.preventDefault();
    dispatch(signup(name,email,adress,country,postalCode,phone,password));
   
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
       {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <form className="Login col-md-8 col-lg-4 col-11"
        onSubmit={submitHandler}>
          <input type="text" placeholder="Username" value={name} onChange={(e)=> setName(e.target.value)}/>
          <input type="text" placeholder="adress" value={adress} onChange={(e)=> setAdress(e.target.value)}/>
          <input type="text" placeholder="country" value={country} onChange={(e)=> setCountry(e.target.value)}/>
          <input type="text" placeholder="PostalCode" value={postalCode} onChange={(e)=> setPostalCode(e.target.value)}/>
          <input type="text" placeholder="Phone" value={phone} onChange={(e)=> setPhone(e.target.value)}/>

          <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>

          <button type="submit">Register</button>
          <p>
            <Link to={redirect ? '/login?redirect='+{redirect}+'' : "/login"}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
