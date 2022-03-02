import {
    Paper, Box, Tabs, Tab,
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import { TabPanel } from 'src/components';
import { FormattedMessage } from 'react-intl';
import {
    Profile, AvatarTab, ChangePasswordTab, NotificationTab,
} from 'src/widgets';
import { ApiProfileBaseCurrentRepository } from 'repository';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import decoder from 'compiled';
import { useToken } from 'src/utility/hooks';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(),
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
        padding: theme.spacing(2, 2),
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
}));

function Settings(props) {
    const classes = useStyles();
    const tokenStatus = useToken();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [userData, setUserData] = useState();
    const registerMutation = useMutation((user) => ApiProfileBaseCurrentRepository.apiProfileBaseCurrentPost(user), {
        onSuccess: (apiData) => {
            const decodedData = decoder.alopal.backend.services.GetBaseProfileResponse.decode(apiData.data);
            setUserData(decodedData);
        },
        onError: (error) => {
            const errResponse = decoder.alopal.backend.BareResponse.decode(error?.response?.data);
            console.log('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', errResponse);
        },
    });
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
    useEffect(() => {
        if (tokenStatus?.token?.token) {
            fetchApi();
        }
    }, [tokenStatus.token]);
    return (
        <Paper elevation={1} className={classes.root}>
            <Box marginTop={2}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="ant example"
                >
                    <Tab label={<FormattedMessage id="common.profile" />} />
                    <Tab label={<FormattedMessage id="common.avatar" />} />
                    <Tab label={<FormattedMessage id="common.password" />} />
                    <Tab label={<FormattedMessage id="common.notification" />} />
                </Tabs>
                <TabPanel value={value} index={0} white>
                    <Profile data={userData} />
                </TabPanel>
                <TabPanel value={value} index={1} white>
                    <AvatarTab data={userData} />
                </TabPanel>
                <TabPanel value={value} index={2} white>
                    <ChangePasswordTab />
                </TabPanel>
                <TabPanel value={value} index={3} white>
                    <NotificationTab />
                </TabPanel>
            </Box>
        </Paper>
    );
}

Settings.propTypes = {

};

export default Settings;
