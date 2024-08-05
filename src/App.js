
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './admin/style.css';
import './delivery/style.css';
import './employee/style.css';
import './component/style.css';
import './user/style.css';
import './App.css';
import Header from './component/header';
import Footer from './component/footer';
import Basket from './user/basket';
import Searh from './user/search';
import Profile from './user/profile';
import Err404 from './SVGs/err404';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './user/home';
import Register from './user/register';
import Login from './user/login';
import Favorite from './user/favorite';
import AdminHome from './admin/home';
import DelivaryHome from './delivery/home'
import EmployeeHome from './employee/home'
import AdminApp from './admin/app';
import DelivaryApp from './delivery/app';
import EmployeeApp from './employee/app'
import SupportEmployee from './employee/support'
import Support from './user/support'
import ProductInfo from './user/productInfo';
import UserOrder from './user/userOrder';
import SelectPoint from './component/selectPoint'

import Ads from './admin/ads';
import Branches from './admin/branches';
import Employees from './admin/employees';
import Products from './admin/products';
import Types from './admin/types';
import Order from './admin/orders'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useSelector } from 'react-redux';
import { dark } from '@mui/material/styles/createPalette';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});


function App() {
  const mode = useSelector((state) => state.mode);
  return (
    <ThemeProvider theme={ mode==="dark" ? darkTheme : lightTheme}>
    <div className={'App '+mode}>
      <BrowserRouter >
        <Header />
          <Routes>
              <Route index element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="basket" element={<Basket />} />
              <Route path="profile" element={<Profile />} />
              <Route path="search/:name/:type" element={<Searh />} />
              <Route path="favorite" element={<Favorite />} />
              <Route path="support" element={<Support />} />
              <Route path="product" element={<ProductInfo />} />
              <Route path="orders" element={<UserOrder />} />
              <Route path="test" element={<SelectPoint />} />
              <Route path="*" element={<Err404 />} />


              <Route path="admin" element={<AdminApp />} >
                <Route path="home" element={<AdminHome />}  />
                <Route path="employees" element={<Employees />}  />
                <Route path="keywords" element={<Types />}  />
                <Route path="products" element={<Products />}  />
                <Route path="branchs" element={<Branches />}  />
                <Route path="ads" element={<Ads />}  />
                <Route path="order" element={<EmployeeHome />}  />
              </Route>


              <Route path="delivary" element={<DelivaryApp />} >
                <Route path="home" element={<DelivaryHome />} />
              </Route>


              <Route path="employee" element={<EmployeeApp />} >
                <Route path="home" element={<EmployeeHome />} />
                <Route path="support" element={<SupportEmployee />} />
              </Route>
              
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;
