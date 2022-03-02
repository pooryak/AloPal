import Head from 'next/head';
import { useEffect, useState } from 'react';
import {
    HomeServices, Howitworks, Banner, Greeting,
} from 'src/widgets';
import { useMutation, useQueryClient } from 'react-query';
import { FormattedMessage } from 'react-intl';
import { useToken } from 'src/utility/hooks';
import { makeStyles } from '@material-ui/styles';
import { ApiProfileBaseCurrentRepository, ApiProfileBaseAllRepository } from 'repository';
import decoder from 'compiled';

// console.log('🚀 ~ file: index.js ~ line 9 ~ decoder', decoder);

const useStyle = makeStyles((theme) => ({
    container: {
        minHeight: '100vh',
    },
    root: {
        padding: 'unset',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: theme.palette.textColor,

        whiteSpace: 'nowrap',
    },
    button: {
        whiteSpace: 'nowrap !important',
    },
    navDisplayFlex: {
        display: 'flex',
        justifyContent: 'space-between',
        color: '#fff',
        flex: 2,
    },
    regularBut: {
        cursor: 'pointer',
        padding: '0 5px',
        borderRadius: '5px',
        marginRight: '20px',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            transition: `background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
        },
    },
    loginBackground: {
        backgroundColor: theme.palette.thirdinary,
    },
    registered: {
        padding: '70px !important',
    },
    aTag: {
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '7px',
        marginLeft: '5px',
        minWidth: '90px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 'unset !important',
        cursor: 'pointer',
    },
}));

export default function Home() {
    const tokenStatus = useToken();
    const [userData, setUserData] = useState();
    const queryClient = useQueryClient();
    const classes = useStyle();
    const getBaseProfile = useMutation((user) => ApiProfileBaseCurrentRepository.apiProfileBaseCurrentPost(user), {
        onSuccess: (data) => {
            const decodedData = decoder.alopal.backend.services.GetBaseProfileResponse.decode(data.data);
            setUserData(decodedData);
            // cache the profile data
            queryClient.setQueryData(['baseProfile', { id: 1 }], decodedData);
            // console.log('🚀 ~ file: index.js ~ line 75 ~ registerMutation ~ decodedData', decodedData);
        },
        onError: (error) => {
            const errResponse = decoder.alopal.backend.BareResponse.decode(error.response.data);
            console.log('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', errResponse);
        },
    }, 'baseProfile');

    const fetchApi = async () => {
        const dataWithContext = {
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
                },
            },
        };
        const verify = decoder.alopal.backend.services.GetBaseProfileRequest.create(dataWithContext);
        const encodedData = decoder.alopal.backend.services.GetBaseProfileRequest.encode(verify).finish();
        const datacv = await getBaseProfile.mutateAsync(encodedData);
    };

    useEffect(() => {
        if (tokenStatus?.token?.token) {
            fetchApi();
        }
    }, [tokenStatus.token]);

    return (
        <div className={classes.container}>
            <Head>
                <title>Welcome to the Alo Pal</title>
            </Head>
            {
                tokenStatus.token?.is_login && <Greeting data={userData} />
            }
            <main className={classes.main}>
                <HomeServices />
            </main>
            <main className={classes.main}>
                <Howitworks />
            </main>
            <main className={classes.main}>
                <Banner title="home.banner.psyTherapy" href="/services/psychotherapy" />
            </main>
            <main className={classes.main}>
                <Banner title="home.banner.mediTherapy" white href="/services/medical-consultants" />
            </main>
            <main className={classes.main}>
                <Banner title="home.banner.tutors" href="/services/tutors" />
            </main>
        </div>
    );
}
