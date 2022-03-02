import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Container } from 'src/components';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { useAuth } from 'src/utility/contexts/auth';
import axios from 'axios';
import { useToken } from 'src/utility/hooks';
import { ApiProfileBaseAddRepository, ApiUserAddRepository, ApiUploadRequestLinkRepository } from 'repository';
import { ProfileBanner, ProfileForm } from 'src/widgets';
import { makeStyles } from '@material-ui/styles';
import decoder from 'compiled';

console.log('🚀 ~ file: index.js ~ line 13 ~ decoder', decoder);

const useStyles = makeStyles((theme) => ({
    root: {

    },
}));

function RegisterCompletion(props) {
    const router = useRouter();
    const [formData, setFormData] = useState(false);
    const queryData = router.query;
    const auth = useAuth();
    const tokenStatus = useToken();
    const registerMutation = useMutation((user) => ApiProfileBaseAddRepository.apiProfileBaseAddPost(user), {
        onSuccess: (data) => {
            // const decodedData = decoder.alopal.backend.services.ProfileData.decode(data.data);
            router.push('/');
        },
        onError: (error) => {
            console.log(error, 'error');
        },
    });
    const uploadFile = async (data) => {
        console.log('🚀 ~ file: index.js ~ line 103 ~ uploadFile ~ data', data[0]);
        const extension = data[0].name.substring(data[0].name.lastIndexOf('.') + 1, data[0].name.length) || data[0].name;
        const blob = data[0].slice(0, data[0].size);

        const newFile = new File([blob], data.key, { type: 'image' });
        const dataWithCaptcha = {
            requestContext: {
                bearer: {
                    token: 'tokenStatus.token.token',
                },
            },
            fileExtention: extension,
        };
        const verify = decoder.alopal.backend.services.UploadLinkRequest.create(dataWithCaptcha);
        const encodedData = decoder.alopal.backend.services.UploadLinkRequest.encode(verify).finish();
        const response = await ApiUploadRequestLinkRepository.apiUploadRequestLinkPost(encodedData);
        const decodedData = decoder.alopal.backend.services.UploadLinkResponse.decode(response.data);
        const headers = {
            Key: decodedData.assetId,
        };
        const responsePost = await axios.put(decodedData.uploadLink, newFile, { headers });
        return { value: decodedData.assetId, key: data.key, infoType: 1 };
    };
    const postProfile = async (data) => {
        console.log('🚀 ~ file: index.js ~ line 37 ~ postProfile ~ data', formData);
        let links;
        if (formData.avatar.length > 0) {
             links = await uploadFile(formData.avatar);
        }
        console.log('🚀 ~ file: index.js ~ line 126 ~ callSubmit ~ links', links);
        const [firstName, lastName] = formData.name.split(' ');
        const dataWithCaptcha = {
            profileData: {
                publiclyVisibleInfo: {
                    // nickName: formData,
                    profileImageId: links.value,
                },
                privateInformation: {
                    identification: {
                        firstName,
                        lastName,
                        dateOfBirth: {
                            time: formData.dateOfBirth,
                        },
                        country: {
                            value: formData.country,
                        },
                        province: {
                            value: formData.province,
                        },
                        city: {
                            value: formData.city,
                        },
                    },
                    communicationChannels: {
                        emailAddress: queryData.email,
                        phoneNumber: formData.phone,
                    },
                },
                receiveNews: formData.receiveNews,
                currency: formData.currency,
                timeZone: formData.timeZone,
            },
            requestContext: {
                bearer: {
                    token: data,
                },
            },
        };
        console.log('🚀 ~ file: index.js ~ line 66 ~ postProfile ~ dataWithCaptcha', dataWithCaptcha);
        const verify = decoder.alopal.backend.services.SetBaseProfileRequest.create(dataWithCaptcha);
        console.log('🚀 ~ file: index.js ~ line 72 ~ postProfile ~ verify', verify);
        const encodedData = decoder.alopal.backend.services.SetBaseProfileRequest.encode(verify).finish();
        console.log('🚀 ~ file: index.js ~ line 73 ~ postProfile ~ encodedData', encodedData);
        const datacv = await registerMutation.mutateAsync(encodedData);
        // const decodedData = decoder.alopal.backend.services.SetBaseProfileRequest.decode(datacv.data);
    };
    const newUserMutation = useMutation((encodedData) => ApiUserAddRepository.apiUserAddPost(encodedData[0]), {
        onSuccess: async (data, encodedData) => {
            try {
                await auth.signin({
                    username: encodedData[1].user.username,
                    password: encodedData[1].password,
                    rememberMe: encodedData[1].remember_me,
                }).then((res) => postProfile(res));
            } catch (error) {
                console.log(error, 'error82');
                // const errResponse = decoder.alopal.backend.BareResponse.decode(error.response);
            }
        },
        onError: (error) => {
            console.log(error, 'error88');
        },
    });
    const callSubmit = async (data) => {
        console.log('🚀 ~ file: index.js ~ line 132 ~ callSubmit ~ data', data);
        setFormData(data);
        const passwordData = {
            requestContext: {
                bearer: {
                    token: queryData.token,
                },
            },
            user: {
                username: queryData.email,
                emailAddress: queryData.email,
            },
            password: data.password,
        };
        const verifyData = decoder.alopal.backend.RegisterUserRequest.create(passwordData);
        const encodedData = decoder.alopal.backend.RegisterUserRequest.encode(verifyData).finish();
        try {
            await newUserMutation.mutateAsync([encodedData, passwordData]);
        } catch (errors) {
            console.error(errors, 'error');
        }
    };
    return (
        <Container>
            <Grid container>
                <Grid sm={6} xs={12}>
                    <ProfileBanner />
                </Grid>
                <Grid sm={6} xs={12}>
                    <ProfileForm submit={callSubmit} />
                </Grid>

            </Grid>
        </Container>
    );
}

RegisterCompletion.propTypes = {

};

export default RegisterCompletion;
