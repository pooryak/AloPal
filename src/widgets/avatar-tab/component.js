import {
    Box, Avatar, Button, Grid, Divider,
} from '@material-ui/core';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useMutation } from 'react-query';
import decoder from 'compiled';
import { useToken } from 'src/utility/hooks';
import axios from 'axios';
import { ApiUploadRequestLinkRepository, ApiProfileBaseUpdateRepository, ApiDownloadRequestLinkRepository } from 'repository';
import style from './style';

console.log('🚀 ~ file: component.js ~ line 9 ~ decoder', decoder);
function AvatarTab(props) {
    const classes = style();
    const { data } = props;
    const inputRef = useRef();
    const tokenStatus = useToken();
    const avatar = data?.profile?.publiclyVisibleInfo?.profileImageId;
    const uploadFile = async (valv) => {
        // const blob = valv.value[0].slice(0, valv.value[0].size);
        const extension = valv.name.substring(valv.name.lastIndexOf('.') + 1, valv.name.length) || valv.name;
        const newFile = new File([valv], valv.key, { type: 'image' });
        const dataWithCaptcha = {
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
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
        return { value: decodedData.assetId, key: valv.key, infoType: 1 };
    };
    const registerMutation = useMutation((user) => ApiProfileBaseUpdateRepository.apiProfileBaseUpdatePost(user), {
        onSuccess: (apiData) => {
            const decodedData = decoder.alopal.backend.services.UpdateBaseProfileResponse.decode(apiData.data);
            console.log('🚀 ~ file: component.js ~ line 22 ~ registerMutation ~ decodedData', decodedData);
            // setSnackSuccess(true);
        },
        onError: (error) => {
            console.log(error, 'error');
        },
    });
    const uploadFn = async (e) => {
        console.log(inputRef.current.files, 'eeee');
        const links = await uploadFile(inputRef.current.files[0]);
        const newData = {
            profileData: {
                ...data.profile,
            },
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
                },
            },
        };
        newData.profileData.publiclyVisibleInfo.profileImageId = links.value;
        const verify = decoder.alopal.backend.services.UpdateBaseProfileRequest.create(newData);
        console.log('🚀 ~ file: component.js ~ line 33 ~ postProfile ~ verify', verify);
        const encodedData = decoder.alopal.backend.services.UpdateBaseProfileRequest.encode(verify).finish();
        console.log('🚀 ~ file: component.js ~ line 35 ~ postProfile ~ encodedData', encodedData);
        await registerMutation.mutateAsync(encodedData);
    };
    console.log('🚀 ~ file: component.js ~ line 11 ~ AvatarTab ~ data', data);
    const getLink = async () => {
        const newData = {
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
                },
            },
            assetId: avatar,
        };
        const verify = decoder.alopal.backend.services.AssetDownloadLinkRequest.create(newData);
        console.log('🚀 ~ file: component.js ~ line 83 ~ getLink ~ verify', verify);
        const encodedData = decoder.alopal.backend.services.UpdateBaseProfileRequest.encode(verify).finish();
        try {
            const response = await ApiDownloadRequestLinkRepository.apiDownloadRequestLinkPost(encodedData);
            const decodedData = decoder.alopal.backend.services.UpdateBaseProfileResponse.decode(response.data);
            console.log('🚀 ~ file: component.js ~ line 86 ~ getLink ~ decodedData', decodedData);
        } catch (error) {
            console.log('🚀 ~ file: component.js ~ line 91 ~ getLink ~ error', error);
            const errResponse = decoder.alopal.backend.BareResponse.decode(error.response.data);
            console.log('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', errResponse);
        }
    };
    return (
        <Box display="flex" flexDirection="column" marginTop={2}>
            <Box display="flex">
                <div className={classes.input}>
                    <label htmlFor="contained-button-file" className={classes.label}>
                        {
                            avatar
                && <Avatar src={getLink()} />
                        }
                        <Button variant="outlined" color="primary">
                            <FormattedMessage
                                id={avatar ? 'form.change_image' : 'form.upload_image'}
                            />
                        </Button>
                        <input
                            ref={inputRef}
                            accept="image/*"
                            className={classes.input}
                            id="profilePic"
                            type="file"
                            name="profilePic"
                            // onClick={(e) => test(e)}
                            // onChange={test}
                        />
                    </label>
                </div>
            </Box>
            <Grid constainer xs={12} className={classes.divider}>
                <Grid item xs={4} justifyContent="center" className={classes.divider_itm}>
                    <Divider flexItem variant="middle" />

                </Grid>
                <Grid item xs={4} justifyContent="center" className={classes.divider_itm}>
                    <FormattedMessage id="common.or" />
                </Grid>
                <Grid item xs={4} justifyContent="center" className={classes.divider_itm}>
                    <Divider flexItem variant="middle" />
                </Grid>
            </Grid>
            <Box fontSize={14} mt={2}>
                <FormattedMessage id="form.selectAvatar" />
            </Box>
            <Box display="flex" fontSize={14} justifyContent="space-between" flexWrap="wrap">
                {
                    Array(32).fill().map((item) => <Avatar className={classes.avatar} />)
                }
            </Box>
            <Button type="submit" variant="contained" color="secondary" className={classes.form_btn} onClick={uploadFn}>
                <FormattedMessage id="form.btn.save" size="large" />
            </Button>
        </Box>
    );
}

AvatarTab.propTypes = {

};

export default AvatarTab;
