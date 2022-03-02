import '../src/styles/globals.css';
import { useEffect, useLayoutEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { create } from 'jss';
import rtl from 'jss-rtl';
import Cookies from 'js-cookie';
import {
    ThemeProvider,
} from '@material-ui/core/styles';
import { StylesProvider, jssPreset } from '@material-ui/styles';

import protobuf from 'protobufjs';
import axios from 'axios';
import {
    Http,
} from 'src/utility';
import { CacheProvider } from '@emotion/react';
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
import { ProvideAuth } from 'src/utility/contexts/auth';
import PropTypes from 'prop-types';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import theme from 'src/styles/theme';
import { Translation } from 'src/components';
import { UserProvider } from 'src/components/local-provider/component';
import { Layout } from 'src/widgets';
import locales from 'src/locales';
import { useSettings } from 'src/utility/hooks';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { makeServer } from 'src/miragejs/mirage';
import constants from '../constants';

const queryClient = new QueryClient();
makeServer();

function MyApp({ Component, pageProps }) {
    const onSuccessRequest = (request) => {
        const success_request = request;
        const { token_prefix, user } = pageProps;
        if (user && user.is_login) {
            success_request.headers.Authorization = [token_prefix, user.token].join(' ');
        }
        return request;
    };

    function isArrayBuffer(obj) {
        return Object.prototype.toString.call(obj) === '[object ArrayBuffer]';
    }

    function configureHttp() {
        const instance = axios.create({
            baseURL: constants.baseUrl,
            timeout: constants.timeout,
            responseType: 'arraybuffer',
            transformRequest: [(data, headers) => {
                if (data) {
                    const transformedData = new Blob([data], { type: 'buffer' });
                    return transformedData;
                }
            },
            ...axios.defaults.transformRequest],
            transformResponse: [(rawResponse) => {
                console.log(rawResponse, '1rawResponse');
                if (rawResponse == null || !isArrayBuffer(rawResponse)) {
                    console.log(rawResponse, 'rawResponse');
                    return rawResponse;
                }
                try {
                    const buf = protobuf.util.newBuffer(rawResponse);
                    return buf;
                } catch (err) {
                    console.log(err, 'errr');
                    return err;
                }
            }],
            headers: {
                Accept: constants.Accept,
                'Access-Control-Allow-Origin': '*',
                'Accept-Language': constants['Accept-Language'],
                'Content-Type': constants['Content-Type'],
            },
        });
        // instance.interceptors.request.use(onSuccessRequest);
        Http.instance = instance;
    }

    configureHttp();

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    const {
        local, direction, localChanger, mode, changeMode,
    } = useSettings();
    const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
    const cacheRtl = createCache({
        key: direction === 'rtl' ? 'muirtl' : 'cssltr',
        prepend: true,
        stylisPlugins: direction === 'rtl' && [rtlPlugin],
    });
    const emotionCache = {
        LTR: createCache({
            key: 'ltr',
            prepend: true,
        }),
        RTL: createCache({
            key: 'rtl',
            stylisPlugins: [rtlPlugin],
            prepend: true,
        }),
    };
    const cache = createCache({ key: 'css' });
    cache.compat = true;
    const selectedCache = direction !== 'rtl' ? emotionCache.LTR : emotionCache.RTL;
    const themes = theme({ direction, mode });
    return (
        <StyledEngineProvider injectFirst>
            <StylesProvider jss={jss}>
                <CacheProvider value={selectedCache}>
                    <ThemeProvider theme={themes}>
                        <UserProvider value={{
                            language: local, lock: (data) => localChanger(data), direction, changeMode,
                        }}
                        >
                            <CssBaseline />
                            <QueryClientProvider client={queryClient}>
                                <ProvideAuth>
                                    <Translation locales={locales}>
                                        <Layout data={{ local, direction }}>
                                            <Component {...pageProps} />
                                        </Layout>
                                    </Translation>
                                </ProvideAuth>
                                <ReactQueryDevtools initialIsOpen />
                            </QueryClientProvider>
                        </UserProvider>
                    </ThemeProvider>
                </CacheProvider>
            </StylesProvider>
        </StyledEngineProvider>

    );
}

MyApp.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.object.isRequired,
};

export default MyApp;
