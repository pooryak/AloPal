import { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { Container } from 'src/components';
import PropTypes from 'prop-types';
import { RegisterBanner, RegisterForm, WelcomeStatus } from 'src/widgets';
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import { useAuth } from 'src/utility/contexts/auth';
import { useToken } from 'src/utility/hooks';
import decoder from 'compiled';
import constants from 'constants.js';
import { ApiDeleteDatabaseRepository } from 'repository';

const useStyle = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
}));

function Register(props) {
    const [sentMail, setSentMail] = useState(true);
    const [err, setErr] = useState();
    const classes = useStyle();
    const router = useRouter();
    const auth = useAuth();
    const tokenStatus = useToken();

    if (tokenStatus.token?.is_login) {
        router.push('/');
    }

    const verification = async (data) => {
        const [firstName, lastName] = data.name.split(' ');
        const dataWithUserType = {
            ...data,
            userType: constants.userTypes.ALO,
            firstName,
            lastName,
        };
        try {
            await auth.signup(dataWithUserType)
                .then(() => setSentMail(true));
        } catch (error) {
            const errResponse = decoder.alopal.backend.BareResponse.decode(error.response.data);
            setErr(errResponse.responseContext?.status?.message);
        }
    };

    return (
        <Container>
            <Box display="flex" className={classes.root}>
                <RegisterBanner />
                {
                    !sentMail ? <RegisterForm verification={verification} errorResult={err} /> : <WelcomeStatus />
                }
            </Box>
        </Container>

    );
}

Register.propTypes = {

};

export default Register;
