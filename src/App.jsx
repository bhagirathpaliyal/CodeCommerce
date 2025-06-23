import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Men from './pages/Men/Men';
import Home from './components/Home/Home';
import Women from './pages/Women/Women';
import Jewelery from './pages/Jewelery/Jewelery';
import Electronics from './pages/Electronics/Electronics';
import Header from './components/Header/Header';
import Profile from './components/Profile';
import AllProducts from './pages/AllProducts';
import Products from './components/Products';
import Cart from './components/Cart';
import { useDispatch } from 'react-redux';
import { setUser } from "./store/feature/authSlice";
import { UserTypeSelector } from './components/UserTypeSelecctor';
import { UserTypeSelectorLogin } from './components/UserTypeSelecctorLogin';
import AddProducts from './components/AddProducts';
import Order from './components/Order/Order';
import OrderDetails from './components/Order/OrderDetails';


function App() {
const dispatch =useDispatch()

useEffect(()=>{

  dispatch(setUser(JSON.parse(localStorage.getItem('user'))))
  
},[])
  return (
   
      <BrowserRouter basename='CodeCommerce'>
        <div className="mx-auto">
          <Header />
          <Routes >
            <Route path="/" element={<Home />} />
            
            <Route path="/Login" element={<UserTypeSelectorLogin />} />
            <Route path="/SignUp" element={<UserTypeSelector />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Products" element={<Products/>} >
            <Route path="/Products/AllProducts" element={<AllProducts/>} />
            <Route path="/Products/Men" element={<Men />} />
            <Route path="/Products/Women" element={<Women />} />
            <Route path="/Products/Jewelery" element={<Jewelery />} />
            <Route path="/Products/Electronics" element={<Electronics />} />
            </Route>
            <Route path="/cart" element={<Cart />} />

            <Route path="/AddProducts" element={<AddProducts />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/OrderDetails" element={<OrderDetails />} />
          </Routes>
        </div>
      </BrowserRouter>

  );
}

export default App;
