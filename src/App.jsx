import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"
import CountersPage from "./pages/CountersPage"
import DishesPage from "./pages/DishesPage"
import ProfilePage from "./pages/ProfilePage"
import { useDispatch, useSelector } from "react-redux"
import { setUser, setLoading } from "./slices/authSlice.js"
import { setCart, setCartLoading } from "./slices/cartSlice"
import { Auth, LoginPage, RegisterPage } from "./pages/AuthenticationPage"
import DishesByCounter from "./components/DishesByCounter"
import AllUsersPage from "./pages/AllUsersPage"
import CreateCounterPage from "./pages/CreateCounterPage"
import CreateDishPage from "./pages/CreateDishPage"
import Footer from "./components/Footer"
import MerchantCounters from "./pages/MerchantCounters.jsx"
import { useRetryApi } from "./hooks.js"

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);
  const retryGetApi = useRetryApi('get');

  useEffect(() => {
    async function fetchUser() {
      dispatch(setLoading(true));
      try {
        console.log("App.jsx fetchUser");
        const user = await retryGetApi("/cart");
        console.log("user", user);
        dispatch(setUser(user));
      } catch (err) {
        console.error(err.message);
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchUserCart() {
      dispatch(setCartLoading(true))
      try {
        const res = await retryGetApi("/cart");
        const cart = res.cart;
        dispatch(setCart(cart));
      } catch (err) {
        console.error(err.message);
      } finally {
        dispatch(setCartLoading(false))
      }
    }
    fetchUserCart();
  }, [user]);


  if (loading) {
    return (
      <div className="bg-gray-950 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100"></div>
      </div>
    )
  }

  return (
    <div>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<HomePage />} />
          <Route element={<Auth />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/counters" element={<CountersPage />} />
            <Route path="/dishes" element={<DishesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dish/counter/:counterId" element={<DishesByCounter />} />
            <Route path="/allUsers" element={<AllUsersPage />} />
            <Route path="/dish/counter/create" element={<CreateCounterPage />} />
            <Route path="/dish/create" element={<CreateDishPage />} />
            <Route path="/merchantCounters" element={<MerchantCounters />} />
          </Route>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>
      </Routes>
      {user && <Footer />}
    </div>
  )
}

export default App
