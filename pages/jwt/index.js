import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'src/utility/contexts/auth';
import { useMutation } from 'react-query';
import { SetPassword } from 'src/widgets';
import { Container } from 'src/components';
import { ApiEmailVerifyRepository, ApiUserAddRepository } from 'repository';
import session from 'compiled';
import PropTypes from 'prop-types';
import constants from 'constants.js';

function JWT(props) {
    const router = useRouter();
    console.log('🚀 ~ file: index.js ~ line 14 ~ JWT ~ router', router);
    const {
        id, code, email, userType, first_Name, last_Name,
    } = router.query;
    const userAccess = constants.userTypes[userType];
    const [passwordStage, setPasswordStage] = useState(false);
    console.log('🚀 ~ file: index.js ~ line 8 ~ JWT ~ router', router, session, 'session');
    const mutation = useMutation((encodedData) => ApiEmailVerifyRepository.apiEmailVerifyPost(encodedData), {
        onSuccess: (data) => {
            const decodedData = session.alopal.backend.EmailVerificationResponse.decode(data.data);
            setPasswordStage(decodedData);
        },
        onError: (error) => {
            console.log(error, 'error');
        },
    });
    const verifyUser = async (ids, codeKey) => {
        const data = {
            requestContext: {
                bearer: {
                    emailTokenId: ids,
                },
            },
            key: codeKey,
        };
        const verifyData = session.alopal.backend.EmailVerificationRequest.create(data);
        const encodedData = session.alopal.backend.EmailVerificationRequest.encode(verifyData).finish();
        try {
            await mutation.mutateAsync(encodedData);
        } catch (errors) {
            console.error(errors, 'error');
        }
    };
    useEffect(() => {
        if (id, code) {
            verifyUser(id, code);
        }
    }, [id, code]);
    // const { token, userType } = router.query;
    // const auth = useAuth();
    // auth.signin()
    //     .then(() => { router.push('/'); });
    // if (userType === '' || !token) {
    //     return (
    //         <Container>Waiting ....</Container>
    //     );
    // }
    if (passwordStage && userAccess === 0) {
        router.push({ pathname: '/profile-completion', query: { token: passwordStage.userRegistrationToken, email } });
    }
    if (passwordStage && userAccess === 1) {
        router.push({ pathname: '/pal-profile-completion', query: { token: passwordStage.userRegistrationToken, email } });
    }
    return (
        <Container>Waiting ....</Container>
    );
}

JWT.propTypes = {

};

export default JWT;
