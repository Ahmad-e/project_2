
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
import Favorite from './user/favorite';
import AdminHome from './admin/home';
import DelivaryHome from './delivery/home'
import EmployeeHome from './employee/home'
import AdminApp from './admin/app';
import DelivaryApp from './delivery/app';
import EmployeeApp from './employee/app'
import Support from './user/support'
import ProductInfo from './user/productInfo';
import UserOrder from './user/userOrder';


function App() {
  return (
    <div className='App dark'>
      <BrowserRouter >
        <Header />
          <Routes>
              <Route index element={<Home />} />
              <Route path="basket" element={<Basket />} />
              <Route path="profile" element={<Profile />} />
              <Route path="search" element={<Searh />} />
              <Route path="favorite" element={<Favorite />} />
              <Route path="support" element={<Support />} />
              <Route path="product" element={<ProductInfo />} />
              <Route path="orders" element={<UserOrder />} />
              <Route path="*" element={<Err404 />} />


              <Route path="admin" element={<AdminApp />} >
                <Route path="home" element={<AdminHome />}  />
              </Route>


              <Route path="delivary" element={<DelivaryApp />} >
                <Route path="home" element={<DelivaryHome />} />
              </Route>


              <Route path="employee" element={<EmployeeApp />} >
                <Route path="home" element={<EmployeeHome />} />
              </Route>
              
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
