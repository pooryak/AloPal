import { useState } from 'react';
import { useToken } from 'src/utility/hooks';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { LoginBanner, LoginForm } from 'src/widgets';
import { Container } from 'src/components';
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import { useAuth } from 'src/utility/contexts/auth';
import decoder from 'compiled';

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
}));
function Login(props) {
    const classes = useStyle();
    const router = useRouter();
    const [err, setErr] = useState();
    console.log("🚀 ~ file: index.js ~ line 24 ~ Login ~ err", err)
    const auth = useAuth();
    const tokenStatus = useToken();
    if (tokenStatus.token?.is_login) {
        router.push('/');
    }
    const onSubmit = async (data) => {
        try {
            await auth.signin({ username: data.email, password: data.password, rememberMe: data.remember_me })
                .then(() => router.push('/'));
        } catch (error) {
            try {
            console.log("🚀 ~ file: index.js ~ line 35 ~ onSubmit ~ error", error)
                const errResponse = decoder.alopal.backend.BareResponse.decode(error?.response?.data);
                console.log('🚀 ~ file: index.js ~ line 38 ~ onSubmit ~ errResponse', errResponse);
                setErr(errResponse?.responseContext?.status?.message);
            } catch (e) {
                console.log(e, 'error');
            }
        }
    };
    return (
        <Container max-width="lg">
            <Grid item xs={12} className={classes.root}>
                <LoginBanner />
                <LoginForm onSubmit={onSubmit} errorResult={err} />
            </Grid>
        </Container>
    );
}

Login.propTypes = {

};

export default Login;
