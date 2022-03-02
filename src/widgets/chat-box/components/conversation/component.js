import { Box, Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';
import style from './style';

function Conversation(props) {
    const classes = style();
    const { data, userId } = props;
    console.log('🚀 ~ file: component.js ~ line 8 ~ Conversation ~ data', data);
    return (
        <Box display="flex" flexDirection="column" alignSelf="stretch" className={classes.root}>
            {
                data.map((item) => (
                    <>
                        {
                            userId === item.message.senderUserId.value ? (
                                <Box className={classes.container} display="flex" alignItems="center">
                                    <Avatar />
                                    <Box className={classes.me}>
                                        {item?.message?.content}
                                    </Box>
                                </Box>
                            )
                                : (
                                    <Box className={classes.container} display="flex" alignItems="center" justifyContent="flex-end">
                                        <Box className={classes.him}>
                                            {item?.message?.content}
                                        </Box>
                                        <Avatar />
                                    </Box>
                                )
                        }

                    </>
                ))
            }
        </Box>
    );
}

Conversation.propTypes = {

};

export default Conversation;
