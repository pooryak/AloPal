import { Box, Avatar, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import style from './style';

function UsersList(props) {
    const { data, clickHandle } = props;
    const classes = style();
    return (
        <Box display="flex" flexDirection="column" mt={3} pl={2} pt={1} pb={1}>
            <Box color="aloPal.dark" fontWeight={700} fontSize={18}>
                PALS
            </Box>
            {
                data.map((item) => (
                    <Box display="flex" alignItems="center" className={classes.container} onClick={() => clickHandle(item)}>
                        <Box>
                            <Avatar />
                        </Box>
                        <Box display="flex" flexDirection="column" className={classes.txt}>
                            <Box display="flex" justifyContent="space-between">
                                <Box fontWeight={700} fontSize={18} color="aloPal.blue">
                                    {item.sender}
                                </Box>
                                <Box fontWeight={400} fontSize={14}>
                                    {item.date}
                                </Box>
                            </Box>
                            <Box textOverflow="ellipsis" className={classes.desc}>
                                <Typography variant="caption">
                                    {item.texts[0].you}
                                </Typography>
                            </Box>
                        </Box>

                    </Box>
                ))
            }
        </Box>
    );
}

UsersList.propTypes = {

};

export default UsersList;
