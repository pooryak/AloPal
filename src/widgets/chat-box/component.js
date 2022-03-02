import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useToken } from 'src/utility/hooks';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ApiMessageSendRepository, ApiProfileBaseCurrentRepository } from 'repository';
import decoder from 'compiled';
import { Footer, Conversation } from './components';
import style from './style';

function ChatBox(props) {
    const queryClient = useQueryClient();
    const tokenStatus = useToken();
    const registerMutation = useMutation((user) => ApiProfileBaseCurrentRepository.apiProfileBaseCurrentPost(user), {
        onSuccess: (data) => {
            const decodedData = decoder.alopal.backend.services.GetBaseProfileResponse.decode(data.data);
            // setUserData(decodedData);
            queryClient.setQueryData(['baseProfile', { id: 1 }], decodedData);
            console.log('🚀 ~ file: index.js ~ line 75 ~ registerMutation ~ decodedData', decodedData);
        },
        onError: (error) => {
            console.log('🚀 ~ file: component.js ~ line 21 ~ registerMutation ~ error', error);
            // const errResponse = decoder.alopal.backend.BareResponse.decode(error.response.data);
            // console.log('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', errResponse);
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
        console.log('🚀 ~ file: index.js ~ line 88 ~ fetchApi ~ dataWithContext', dataWithContext);
        const verify = decoder.alopal.backend.services.GetBaseProfileRequest.create(dataWithContext);
        const encodedData = decoder.alopal.backend.services.GetBaseProfileRequest.encode(verify).finish();
        const datacv = await registerMutation.mutateAsync(encodedData);
    };
    const baseProfile = queryClient.getQueryData(['baseProfile', { id: 1 }]);
    console.log('🚀 ~ file: component.js ~ line 13 ~ ChatBox ~ baseProfile', baseProfile);
    useEffect(() => {
        if (tokenStatus?.token?.token && !baseProfile) {
            fetchApi();
        }
    }, [tokenStatus.token]);
    const classes = style();
    const { data, refresh } = props;
    const sendMessageApi = useMutation((user) => ApiMessageSendRepository.apiMessageSendPost(user), {
        onSuccess: (apiData) => {
            refresh();
            // const decodedData = decoder.alopal.backend.services.sendMessageResponse.decode(apiData.data);
            // console.log('🚀 ~ file: index.js ~ line 115 ~ registerMutation ~ decodedData', decodedData);
            // setData(decodedData);
        },
        onError: (error) => {
            console.log('🚀 ~ file: index.js ~ line 159 ~ sendMessageApi ~ error', error);
            const errResponse = decoder.alopal.backend.BareResponse.decode(error?.response?.data);
            console.log('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', errResponse);
        },
    });
    const handleSubmit = async (value) => {
        console.log(value, 'hi');
        const dataWithContext = {
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
                },
            },
            message: {
                content: value,
                receiverUserId: {
                    value: 4,
                },
                senderUserId: {
                    value: baseProfile?.profile?.id?.value,
                },
                title: 'testtt222',
                meetingId: {
                    value: 26,
                },
            },
        };
        const verify = decoder.alopal.backend.sendMessageRequest.create(dataWithContext);
        console.log('🚀 ~ file: index.js ~ line 184 ~ sendMessages ~ verify', verify);
        const encodedData = decoder.alopal.backend.sendMessageRequest.encode(verify).finish();
        const datacv = await sendMessageApi.mutateAsync(encodedData);
    };
    return (
        <Box className={classes.container}>
            {
                data ? (
                    <Box display="flex" flexDirection="column" className={classes.root}>
                        <Conversation data={data} userId={baseProfile?.profile?.id?.value} />
                        <Footer handleSubmit={handleSubmit} />
                    </Box>
                ) : <div>NO MESSAGES</div>
            }
        </Box>
    );
}

ChatBox.propTypes = {

};

export default ChatBox;
