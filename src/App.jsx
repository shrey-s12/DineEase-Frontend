import axios from "axios"
import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"
import CountersPage from "./pages/CountersPage"
import DishesPage from "./pages/DishesPage"
import ProfilePage from "./pages/ProfilePage"
import { useDispatch } from "react-redux"
import { setUser } from "./slices/authSlice"
import { setCart } from "./slices/cartSlice"
import { LoginPage, RegisterPage } from "./pages/AuthenticationPage"
import DishesByCounter from "./components/DishesByCounter"
import AllUsersPage from "./pages/AllUsersPage"
import CreateCounterPage from "./pages/CreateCounterPage"
import CreateDishPage from "./pages/CreateDishPage"

const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function userInfo(token) {
      try {
        const res = await axios.get(`${MAIN_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const user = res.data;
        const cart = user.cart;
        dispatch(setUser(user));
        dispatch(setCart(cart));
      } catch (err) {
        console.error(err.message);
      }
    }
    userInfo(localStorage.getItem("token"))
  }, [])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/counters" element={<CountersPage />} />
        <Route path="/dishes" element={<DishesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/dish/counter/:counterId" element={<DishesByCounter />} />
        <Route path="/allUsers" element={<AllUsersPage />} />
        <Route path="/dish/counter/create" element={<CreateCounterPage />} />
        <Route path="/dish/create" element={<CreateDishPage />} />
      </Routes>
    </div>
  )
}

export default App
