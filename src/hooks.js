import { useDispatch } from "react-redux";
import { setUser } from "./slices/authSlice";
import { authCall, REFRESH_TOKEN_ERROR, retryApi } from "./utils";
const MAIN_URL = import.meta.env.VITE_MAIN_API_URL;

export const useRetryApi = (method) => {
    const dispatch = useDispatch();
    const call = async (url, body) => {
        try {
            return await retryApi(method, url, body);
        } catch (err) {
            if (err.message === REFRESH_TOKEN_ERROR) {
                dispatch(setUser(null));
            }
            throw err;
        }
    };
    return call;
};

export const useAuthLogin = () => {
    const retryGetApi = useRetryApi('get');
    const dispatch = useDispatch();

    const fetchUser = async () => {
        try {
            const user = await retryGetApi(`${MAIN_URL}/cart`);
            dispatch(setUser(user));
        } catch (err) {
            console.error('Error fetching cart:', err);
            throw err;
        }
    };
    const login = async (email, password) => {
        await authCall.login(email, password);
        await fetchUser();
    };
    return login;
};

export const useAuthLogout = () => {
    const dispatch = useDispatch();
    const logout = async () => {
        await authCall.logout();
        dispatch(setUser(null));
    };
    return logout;
};