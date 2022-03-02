import {
    Paper, Box, Tabs, Tab,
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import { TabPanel, Authentication } from 'src/components';
import { FormattedMessage } from 'react-intl';
import {
    Profile, AvatarTab, ChangePasswordTab, NotificationTab,
} from 'src/widgets';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { makeStyles } from '@material-ui/styles';
import { ApiProfileBaseCurrentRepository } from 'repository';
import { useToken } from 'src/utility/hooks';
import decoder from 'compiled';

console.log('🚀 ~ file: index.js ~ line 9 ~ decoder', decoder);

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(7),
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
        padding: theme.spacing(2, 2),
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        '& .MuiTabs-flexContainer $button': {
            color: theme.palette.aloPal.dark,
            fontWeight: theme.typography.fontWeightBold,
        },
    },
    tabs: {
        borderBottom: `1px solid ${theme.palette.secondary.main}`,
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
        <Authentication>
            <Paper className={classes.root}>
                <Box marginTop={2}>
                    <div className={classes.tabs}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            textColor="aloPal.dark"
                            indicatorColor="secondary"
                        >
                            <Tab label={<FormattedMessage id="common.profile" />} />
                            <Tab label={<FormattedMessage id="common.avatar" />} />
                            <Tab label={<FormattedMessage id="common.password" />} />
                            <Tab label={<FormattedMessage id="common.notification" />} />
                        </Tabs>
                    </div>
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
        </Authentication>
    );
}

Settings.propTypes = {

};

export default Settings;
