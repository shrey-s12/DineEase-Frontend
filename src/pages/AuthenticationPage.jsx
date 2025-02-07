import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/authSlice";

const AUTH_URL = import.meta.env.VITE_AUTH_API_URL;

export const Auth = () => {
    const user = useSelector(state => state.auth.user);
    const location = useLocation();

    return (
        user
            ? <Outlet />
            : <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
    );
}

const AuthPage = ({ type }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (type === "login") {
                const res = await axios.post(`${AUTH_URL}/auth/login`, { email, password });
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("refresh_token", res.data.refresh_token);
                dispatch(setUser(res.data.user));
                navigate("/profile");
            } else {
                await axios.post(`${AUTH_URL}/auth/register`, { name, email, password });
                navigate("/auth/login");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4">
            <div className="bg-gray-800 bg-opacity-90 p-8 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-lg border border-gray-700">
                <h1 className="text-3xl font-bold text-center mb-6">
                    {type === "login" ? "Welcome Back" : "Create an Account"}
                </h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {type === "register" && (
                        <div>
                            <label className="block text-sm mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="example@mail.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        {type === "login" ? "Login" : "Register"}
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    {type === "login" ? "Don’t have an account? " : "Already have an account? "}
                    <Link to={type === "login" ? "/auth/register" : "/auth/login"} className="text-blue-400 hover:underline">
                        {type === "login" ? "Sign up" : "Login"}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export const LoginPage = () => <AuthPage type="login" />;
export const RegisterPage = () => <AuthPage type="register" />;