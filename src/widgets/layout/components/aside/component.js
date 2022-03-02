import { Box, Avatar, Divider } from '@material-ui/core';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import MessageIcon from '@material-ui/icons/Message';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useToken } from 'src/utility/hooks';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useTheme } from '@material-ui/core/styles';
import { ApiMessageSendRepository, ApiProfileBaseCurrentRepository, ApiDownloadRequestLinkRepository } from 'repository';
import decoder from 'compiled';
import PropTypes from 'prop-types';
import style from './style';

function Aside(props) {
    const classes = style();
    const { path, userType } = props;
    const queryClient = useQueryClient();
    const tokenStatus = useToken();
    const theme = useTheme();
    const registerMutation = useMutation((user) => ApiProfileBaseCurrentRepository.apiProfileBaseCurrentPost(user), {
        onSuccess: (data) => {
            const decodedData = decoder.alopal.backend.services.GetBaseProfileResponse.decode(data.data);
            // setUserData(decodedData);
            queryClient.setQueryData(['baseProfile', { id: 1 }], decodedData);
        },
        onError: (error) => {
            console.log('🚀 ~ file: component.js ~ line 21 ~ registerMutation ~ error', error);
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
        const datacv = await registerMutation.mutateAsync(encodedData);
    };
    const baseProfile = queryClient.getQueryData(['baseProfile', { id: 1 }]);
    useEffect(() => {
        if (tokenStatus?.token?.token && !baseProfile) {
            fetchApi();
        }
    }, [tokenStatus.token]);
    const getLink = async (id) => {
        const newData = {
            requestContext: {
                bearer: {
                    token: tokenStatus.token.token,
                },
            },
            assetId: id,
        };
        const verify = decoder.alopal.backend.services.AssetDownloadLinkRequest.create(newData);
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
        <aside className={classes.menu}>
            <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
                <Avatar className={classes.avatar} src={getLink(baseProfile?.profile?.publiclyVisibleInfo?.profileImageId)} />
            </Box>
            <Box fontWeight={600} display="flex" justifyContent="center" alignItems="center" className={classes.fullName} marginTop={1}>
                {baseProfile?.profile?.privateInformation?.identification?.firstName}
                {' '}
                {baseProfile?.profile?.privateInformation?.identification?.lastName}
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
                {baseProfile?.profile?.privateInformation?.communicationChannels?.emailAddress}
            </Box>
            <Box className={classes.menuBox}>
                <Link href={`/dashboards/${userType}`}>
                    <Box {...(path === `/dashboards/${userType}`)
                    && { style: { backgroundColor: theme.palette.aloPal.shades[1], color: theme.palette.secondary.main } }}
                    >
                        <DashboardIcon />
                        {' '}
                        <Box
                            component="span"
                            fontWeight={path === `/dashboards/${userType}` && 700}
                            color={path === `/dashboards/${userType}` && '#4a4a4a'}
                        >

                            <FormattedMessage id="layout.aside.dashboard" />
                        </Box>
                    </Box>
                </Link>
                <Divider />
                <Link href={`/dashboards/${userType}/sessions-and-courses`}>
                    <Box {...(path.includes(`/dashboards/${userType}/sessions-and-courses`)
                    && { style: { backgroundColor: theme.palette.aloPal.shades[1], color: theme.palette.secondary.main } })}
                    >
                        <LiveTvIcon />
                        {' '}
                        <Box
                            component="span"
                            fontWeight={path === `/dashboards/${userType}/sessions-and-courses` && 700}
                            color={path === `/dashboards/${userType}/sessions-and-courses` && '#4a4a4a'}
                        >

                            <FormattedMessage id="layout.aside.sessions" />
                        </Box>
                    </Box>
                </Link>
                <Divider />
                <Link href={`/dashboards/${userType}/wallet`}>
                    <Box {...(path.includes(`/dashboards/${userType}/wallet`)
                    && { style: { backgroundColor: theme.palette.aloPal.shades[1], color: theme.palette.secondary.main } })}
                    >
                        <AccountBalanceWalletIcon />
                        {' '}
                        <Box
                            component="span"
                            fontWeight={path === `/dashboards/${userType}/wallet` && 700}
                            color={path === `/dashboards/${userType}/wallet` && '#4a4a4a'}
                        >

                            <FormattedMessage id="layout.aside.wallet" />
                        </Box>
                    </Box>
                </Link>
                <Divider />
                <Link href={`/dashboards/${userType}/messages`}>
                    <Box {...(path.includes(`/dashboards/${userType}/messages`)
                    && { style: { backgroundColor: theme.palette.aloPal.shades[1], color: theme.palette.secondary.main } })}
                    >
                        <MessageIcon />
                        {' '}
                        <Box
                            component="span"
                            fontWeight={path === `/dashboards/${userType}/messages` && 700}
                            color={path === `/dashboards/${userType}/messages` && '#4a4a4a'}
                        >

                            <FormattedMessage id="layout.aside.messages" />
                        </Box>
                    </Box>
                </Link>
                <Divider />
                <Link href={`/dashboards/${userType}/settings`}>
                    <Box {...(path.includes(`/dashboards/${userType}/settings`)
                    && { style: { backgroundColor: theme.palette.aloPal.shades[1], color: theme.palette.secondary.main } })}
                    >
                        <PersonOutlineIcon />
                        {' '}
                        <Box
                            component="span"
                            fontWeight={path === `/dashboards/${userType}/settings` && 700}
                            color={path === `/dashboards/${userType}/settings` && '#4a4a4a'}
                        >

                            <FormattedMessage id="layout.aside.settings" />
                        </Box>
                    </Box>
                </Link>
                <Divider />
                <Box>
                    <ExitToAppIcon />
                    {' '}
                    <FormattedMessage id="layout.aside.logout" />

                </Box>
            </Box>
        </aside>
    );
}

Aside.propTypes = {

};

export default Aside;
