import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"
import CounterPage from "./pages/CounterPage"
import DishesPage from "./pages/DishesPage"
import ProfilePage from "./pages/ProfilePage"
import { useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setUser } from "./slices/authSlice"
import { setCart } from "./slices/cartSlice"
import { LoginPage, RegisterPage } from "./pages/AuthenticationPage"
import DishesByCounter from "./components/DishesByCounter"

const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${MAIN_URL}/cart`)
      .then(res => {
        const user = res.data;
        const cart = user.cart;
        delete (user.cart);
        dispatch(setUser(user));
        dispatch(setCart(cart));
      })
      .catch(err => {
        console.log(err);
      })
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/counters" element={<CounterPage />} />
        <Route path="/dishes" element={<DishesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/dish/counter/:counterId" element={<DishesByCounter />} />
      </Routes>
    </div>
  )
}

export default App
