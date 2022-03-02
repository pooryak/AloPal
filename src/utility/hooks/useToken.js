import { useState, useEffect } from 'react';
import { useAuth } from 'src/utility/contexts/auth';

const index = () => {
    const [token, setToken] = useState(false);
    const auth = useAuth();
    const logStatus = async () => {
        const status = await auth.checkUser();
        console.log("🚀 ~ file: useToken.js ~ line 9 ~ logStatus ~ status", status)
        return status;
    };
    async function getToken() {
        const res = await logStatus();
        setToken(res);
    }
    useEffect(() => {
        getToken();
    }, [auth?.dummyState]);
    return { token, getToken };
};

export default index;
