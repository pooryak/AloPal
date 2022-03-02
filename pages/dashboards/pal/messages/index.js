import { Paper, Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { UsersList, SelectedUser, ChatBox } from 'src/widgets';
import { useToken } from 'src/utility/hooks';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useMutation } from 'react-query';
import { ApiMessageListReceivedRepository } from 'repository';
import decoder from 'compiled.js';

console.log('🚀 ~ file: index.js ~ line 10 ~ decoder', decoder);

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
        flexWrap: 'wrap',
        maxWidth: '100%',
        overflowX: 'hidden',
    },
    container: {
        flex: 1,
        flexWrap: 'wrap',
        maxWidth: '100%',
        overflowX: 'hidden',
    },
    main: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
}));

const data = [{
    id: 0,
    sender: 'Alo',
    date: '02.09.2020',
    texts: [{
        you: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Pellentesque auctor placerat suscipit. Etiam efficitur, dolor porttitor sollicitudin sodales, 
        nulla enim tincidunt odio, in ultrices nisi mi sagittis orci. Etiam mattis nulla metus.
         Morbi eget rhoncus nisi, nec consectetur urna. Nulla facilisi. Etiam tincidunt luctus facilisis.`,
        me: `
           Morbi eget rhoncus nisi, nec consectetur urna. Nulla facilisi. Etiam tincidunt luctus facilisis.`,
    }],
}, {
    id: 1,
    sender: 'Alo',
    date: '02.09.2020',
    texts: [{
        you: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Pellentesque auctor placerat suscipit. Etiam efficitur, dolor porttitor sollicitudin sodales, 
        nulla enim tincidunt odio, in ultrices nisi mi sagittis orci. Etiam mattis nulla metus.
         Morbi eget rhoncus nisi, nec consectetur urna. Nulla facilisi. Etiam tincidunt luctus facilisis.`,
        me: `
           Morbi eget rhoncus nisi, nec consectetur urna. Nulla facilisi. Etiam tincidunt luctus facilisis.`,
    }],
}, {
    id: 2,
    sender: 'Alo',
    date: '02.09.2020',
    texts: [{
        you: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Pellentesque auctor placerat suscipit. Etiam efficitur, dolor porttitor sollicitudin sodales, 
        nulla enim tincidunt odio, in ultrices nisi mi sagittis orci. Etiam mattis nulla metus.
         Morbi eget rhoncus nisi, nec consectetur urna. Nulla facilisi. Etiam tincidunt luctus facilisis.`,
        me: `
           Morbi eget rhoncus nisi, nec consectetur urna. Nulla facilisi. Etiam tincidunt luctus facilisis.`,
    }],
}, {
    id: 3,
    sender: 'Alo',
    date: '02.09.2020',
    texts: [{
        you: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Pellentesque auctor placerat suscipit. Etiam efficitur, dolor porttitor sollicitudin sodales, 
        nulla enim tincidunt odio, in ultrices nisi mi sagittis orci. Etiam mattis nulla metus.
         Morbi eget rhoncus nisi, nec consectetur urna. Nulla facilisi. Etiam tincidunt luctus facilisis.`,
        me: `
           Morbi eget rhoncus nisi, nec consectetur urna. Nulla facilisi. Etiam tincidunt luctus facilisis.`,
    }],
}];

function Messages(props) {
    const classes = useStyles();
    const [currenUser, setCurrentUser] = useState([]);
    // const [data, setData] = useState([]);
    const tokenStatus = useToken();
    console.log(currenUser, 'currenUser');
    const clickHandle = (item) => {
        setCurrentUser(item);
    };
    const getMessages = useMutation((user) => ApiMessageListReceivedRepository.apiMessageListReceivedPost(user), {
        onSuccess: (apiData) => {
            const decodedData = decoder.alopal.backend.ListMessagesResponse.decode(apiData.data);
            console.log('🚀 ~ file: index.js ~ line 115 ~ registerMutation ~ decodedData', decodedData);
            setCurrentUser(decodedData.messages);
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
        const verify = decoder.alopal.backend.ListMessagesRequest.create(dataWithContext);
        const encodedData = decoder.alopal.backend.ListMessagesRequest.encode(verify).finish();
        const datacv = await getMessages.mutateAsync(encodedData);
    };
    useEffect(() => {
        if (tokenStatus?.token?.token) {
            fetchApi();
        }
    }, [tokenStatus.token]);
    return (
        <Paper elevation={1} className={classes.root}>
            <Grid container className={classes.container}>
                <Grid item xs={3}>
                    {
                        currenUser && <SelectedUser data={currenUser} clickHandle={clickHandle} />
                    }
                    <UsersList data={data} clickHandle={clickHandle} />
                </Grid>
                <Grid item xs={9}>
                    <ChatBox data={currenUser} />
                </Grid>
            </Grid>
        </Paper>

    );
}

Messages.propTypes = {

};

export default Messages;
