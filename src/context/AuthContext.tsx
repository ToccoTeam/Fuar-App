import { createContext, useContext, useEffect, useState } from 'react';
import { getUserInfoService } from '../services/authService';
import localStorageVariables from '../utils/constants/localStorageVariables';
import Loader from '../components/Loader';

export const deafultAuthType: AuthType = {
    email: '',
    fullName: '',
    pathName: '',
    isAuth: false,
};

interface AuthType {
    email: string;
    fullName: string;
    pathName: string;
    isAuth: boolean;
}

export interface AuthContextType {
    auth: AuthType;
    setAuth: any;
}

const AuthContext = createContext<AuthContextType>({
    auth: deafultAuthType,
    setAuth: null,
});

const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = useState<AuthType>(deafultAuthType);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await getUserInfoService();
                if (!response?.data.success) throw new Error();

                setAuth({
                    isAuth: true,
                    email: response.data.data?.email || '',
                    fullName: response.data.data?.fullName || '',
                    pathName: response.data.data?.pathName || '',
                });
            } catch (error) {
                localStorage.removeItem(localStorageVariables.token);
            }
            setLoading(false);
        };

        localStorage.getItem(localStorageVariables.token) !== null
            ? getUserInfo()
            : setLoading(false);

        // eslint-disable-next-line
    }, []);

    const values = { auth, setAuth };

    return (
        <AuthContext.Provider value={values}>
            {loading ? <Loader /> : children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };