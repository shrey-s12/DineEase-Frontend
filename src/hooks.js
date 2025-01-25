import axios from "axios";
import { useState } from "react";

function axiosAuthConfig(method, token, url, body) {
    return {
        method: method,
        url: url,
        data: body,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
}

export function useRetryCall(method) {
    const [loading, setLoading] = useState(false);
    const call = async (url, body) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            return await axios.request(axiosAuthConfig(method, token, url, body));
        } catch (err) {
            const errorMessage = err?.response?.data?.error;
            if (errorMessage !== 'jwt expired') {
                throw err;
            }
            const refresh_Token = localStorage.getItem('refresh_token');
            const response = await axios.post('https://vistora-backend-auth.onrender.com/auth/token', { token: refresh_Token });
            const { token: newToken } = response.data;
            localStorage.setItem('token', newToken);
            console.log("newToken", newToken);
            return await axios.request(axiosAuthConfig(method, newToken, url, body));
        } finally {
            setLoading(false);
        }
    }
    return [loading, call];
}