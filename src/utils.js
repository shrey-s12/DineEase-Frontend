import axios from "axios";

const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;
const AUTH_URL = import.meta.env.VITE_AUTH_API_URL;

export const REFRESH_TOKEN_ERROR = 'refresh token failed';

function axiosAuthConfig(method, url, body) {
    const token = localStorage.getItem('token');
    return {
        method: method,
        url: url,
        data: body,
        headers: {
            Authorization: `Bearer ${token}`
        },
        baseURL: MAIN_URL,
    };
}

export async function retryApi(method, url, body) {
    const apiCall = async () => {
        const response = await axios.request(axiosAuthConfig(method, url, body));
        return response.data;
    };

    const refreshToken = async () => {
        try {
            const newToken = await authCall.token();
            axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        } catch (err) {
            console.error("Refresh token process failed:", err.message);
            throw new Error(REFRESH_TOKEN_ERROR, { cause: err });
        }
    };

    return await retryLogic(apiCall, async (err) => {
        console.error("API Request Failed:", err?.response?.data);

        const errorMessage = err?.response?.data?.error;
        if (errorMessage !== 'jwt expired') {
            throw err;
        }

        console.warn("JWT expired! Refreshing token...");
        await refreshToken();
        return apiCall();
    });
}

export const authCall = {
    login: async (email, password) => {
        const response = await axios.post(`${AUTH_URL}/auth/login`, { email, password });
        const { token, refresh_token } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refresh_token);
    },
    token: async () => {
        const refresh_token = localStorage.getItem('refresh_token');

        if (!refresh_token) {
            console.error("No refresh token found!");
            throw new Error("No refresh token available");
        }

        const response = await axios.post(`${AUTH_URL}/auth/token`, { token: refresh_token }, {
            headers: {
                Authorization: `Bearer ${refresh_token}`,
            }
        });

        const { token: newToken } = response.data;
        localStorage.setItem('token', newToken);
        return newToken;
    },
    register: async (name, email, password) => {
        const response = await axios.post(`${AUTH_URL}/auth/register`, { name, email, password });
        return response.data;
    },
    logout: async () => {
        const response = await axios.request(axiosAuthConfig('delete', `${AUTH_URL}/auth/logout`));
        console.log(response.data);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
    }
}

const retryLogic = async (callback, errHandler, retries = 1) => {
    try {
        return await callback();
    } catch (err) {
        if (retries <= 0) {
            throw err;
        }
        await errHandler(err);
        return await retryLogic(callback, errHandler, --retries);
    }
}