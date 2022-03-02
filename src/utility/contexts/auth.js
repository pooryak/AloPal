import {
    createContext, useContext, useState,
} from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { ApiLoginPlainRepository, ApiEmailRequestRepository } from 'repository';
import session from 'compiled';

const userTypes = {
    0: 'ALO',
    1: 'PAL',
    2: 'ADMIN',
};

export const AuthContext = createContext();

export function ProvideAuth({ children }) {
    // eslint-disable-next-line no-use-before-define
    const auth = useProvideAuth();
    return (<AuthContext.Provider value={auth}>{children}</AuthContext.Provider>);
}

export function useAuth() {
    return useContext(AuthContext);
}

function useProvideAuth() {
    const router = useRouter();
    const [dummyState, setDummy] = useState(false);
    const getCookie = () => new Promise((resolve, reject) => {
        const result = Cookies.getJSON(`alopal_${process.env.NODE_ENV}`);
        resolve(result);
        if (result) {
            setDummy(true);
        } else {
            setDummy(false);
            // reject('false');
        }
    });
    const removeCookie = () => new Promise((resolve, reject) => {
        const result = Cookies.remove(`alopal_${process.env.NODE_ENV}`);
        if (result) {
            setDummy(false);
            resolve(result);
        }
    });

    const checkUser = async () => {
        const storage_cookie = await getCookie();
        return storage_cookie;
    };

    const signout = () => new Promise((resolve, reject) => {
        const storage_cookie = getCookie();
        if (storage_cookie) {
            // router.push('/');
            removeCookie();
            resolve();
        }
        setDummy(false);
    });

    const registerMutation = useMutation((user) => ApiEmailRequestRepository.apiEmailRequestPost(user), {
        onSuccess: (data) => {
            const decodedData = session.alopal.backend.EmailRegistrationResponse.decode(data.data);
        },
        onError: (error) => {
            console.log(error, 'error');
        },
    });

    const signinMutation = useMutation((encodedData) => ApiLoginPlainRepository.apiLoginPlainPost(encodedData));

    const signin = async (data) => {
        console.log('🚀 ~ file: auth.js ~ line 76 ~ signin ~ data', data);
        const dataWithCaptcha = {
            requestContext: {
                bearer: {
                    captcha: {
                        captchaId: '1',
                        captchaResult: '34',
                    },
                },
            },
            username: data.username,
            password: data.password,
        };
        const verifyData = session.alopal.backend.PlainLoginRequest.create(dataWithCaptcha);
        const encodedData = session.alopal.backend.PlainLoginRequest.encode(verifyData).finish();
        const datacv = await signinMutation.mutateAsync(encodedData);
        console.log('🚀 ~ file: auth.js ~ line 92 ~ signin ~ datacv', datacv);
        const decodedData = session.alopal.backend.LoginResponse.decode(datacv.data);
        console.log('🚀 ~ file: auth.js ~ line 92 ~ signin ~ decodedData', decodedData);
        Cookies.set(`alopal_${process.env.NODE_ENV}`,
            { is_login: true, token: decodedData.token, userType: userTypes[decodedData.userType] }, {
                ...data.rememberMe
                && { expires: 7, secure: true },
            });
        return decodedData.token;
        // router.push('/');
    };
    const signup = async (data) => {
        const dataWithCaptcha = {
            emailAddress: data.emailAddress,
            requestContext: {
                bearer: {
                    captcha: {
                        captchaId: 1,
                        captchaResult: '2',
                    },
                },
            },
            userType: data.userType,
            ...(data.firstName && { firstName: data.firstName }),
            ...(data.lastName && { lastName: data.lastName }),
        };
        const verify = session.alopal.backend.EmailRegistrationRequest.create(dataWithCaptcha);
        console.log('🚀 ~ file: auth.js ~ line 116 ~ signup ~ verify', verify);
        const encodedData = session.alopal.backend.EmailRegistrationRequest.encode(verify).finish();
        const datacv = await registerMutation.mutateAsync(encodedData);
        const decodedData = session.alopal.backend.LoginResponse.decode(datacv.data);
    };

    // const signout = () => firebase
    //     .auth()
    //     .signOut()
    //     .then(() => {
    //         setUser(false);
    //     });

    // const sendPasswordResetEmail = (email) => firebase
    //     .auth()
    //     .sendPasswordResetEmail(email)
    //     .then(() => true);

    // const confirmPasswordReset = (password, code) => {
    //     const resetCode = code || getFromQueryString('oobCode');

    //     return firebase
    //         .auth()
    //         .confirmPasswordReset(resetCode, password)
    //         .then(() => true);
    // };

    // useEffect(() => {
    //     // const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    //     //     if (user) {
    //     //         setUser(user);
    //     //     } else {
    //     //         setUser(false);
    //     //     }
    //     // });

    //     return () => unsubscribe();
    // }, []);

    return {
        dummyState,
        checkUser,
        // userId: user && user.uid,
        signin,
        signup,
        signout,
        // sendPasswordResetEmail,
        // confirmPasswordReset,
    };
}

// const getFromQueryString = (key) => queryString.parse(window.location.search)[key];

ProvideAuth.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

ProvideAuth.defaultProps = {
    children: null,
};
