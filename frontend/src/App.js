import Navbar from "./components/navbar/Navbar";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Protected from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";

function App() {
  const user = useSelector((state) => state.user.user);
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order" element={<PlaceOrderPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route
            path="/profile"
            element={
              <Protected isLoggedIn={user}>
                <Profile />
              </Protected>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
