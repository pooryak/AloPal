import { Box, Avatar, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import style from './style';

function SelectedUser(props) {
    const { data, clickHandle } = props;
    console.log("🚀 ~ file: component.js ~ line 7 ~ SelectedUser ~ data", data)
    const classes = style();
    return (
        <Box display="flex" flexDirection="column" >
            <Box display="flex" className={classes.container} onClick={() => clickHandle(data)}>
                <Box>
                    <Avatar />
                </Box>
                <Box display="flex" flexDirection="column" className={classes.txt}>
                    <Box display="flex" justifyContent="space-between">
                        <Box fontWeight={500}>
                            {data?.message?.senderUserId?.value}
                        </Box>
                        <Box>
                            {data?.message?.title}
                        </Box>
                    </Box>
                    <Box textOverflow="ellipsis" className={classes.desc}>
                        <Typography variant="caption">
                            {data?.message?.content}
                        </Typography>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
}

SelectedUser.propTypes = {

};

export default SelectedUser;
