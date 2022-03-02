import PropTypes from 'prop-types';
import {
    Avatar, List, Divider, ListItem, ListItemText, Box,
} from '@material-ui/core';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { MultiLevel } from '..';
import style from './style';

function SideDrawer(props) {
    const { navDetail, leftNav, userMenu } = props;
    const classes = style();
    return (
        <div
            className={classes.list}
            role="presentation"
        >
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding={2}>
                <Avatar />
                <Box marginTop={1} color="white">
                    Jhon Smith
                </Box>
            </Box>

            <List component="nav">
                {leftNav.map((item) => <MultiLevel data={item} key={item.title} mobileView />)}
                <Divider />
                {navDetail.map(({ text, to }) => (
                    <Link href={to} key={text}>
                        <ListItem button className={classes.linkText}>
                            <ListItemText primary={<FormattedMessage id={text} />} />
                        </ListItem>
                    </Link>
                ))}
                <Divider />
                {userMenu.map((item) => <MultiLevel data={item} key={item.title} mobileView />)}
            </List>
        </div>
    );
}

SideDrawer.propTypes = {

};

export default SideDrawer;
