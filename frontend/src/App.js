import Navbar from "./components/navbar/Navbar";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Protected from "./components/ProtectedRoute";
import { useSelector } from "react-redux";

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
