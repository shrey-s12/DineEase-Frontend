import React, { useState } from "react";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAuthLogin } from "../hooks";
import { authCall } from "../utils";

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
    const [loading, setLoading] = useState(false);
    const login = useAuthLogin();
    const register = authCall.register;
    const navigate = useNavigate();
    const location = useLocation();
    const nextPage = location.state?.from || "/profile";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (type === "login") {
                await login(email, password);
                toast.success("Login successful! 🎉");
                navigate(nextPage, { replace: true });
            } else {
                await register(name, email, password);
                toast.success("Account created successfully! 🎉");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
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
                            placeholder="example@gmail.com"
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
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                Processing...
                            </div>
                        ) : type === "login" ? "Login" : "Register"}
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