import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button, Dialog, List,
    ListItem, ListItemText, Divider,
    AppBar, Toolbar, IconButton,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import CloseIcon from '@material-ui/icons/Close';
import style from './style';

function MobileFilters(props) {
    const classes = style();
    const { filterItems,handleChange } = props;
    console.log('🚀 ~ file: component.js ~ line 15 ~ MobileFilters ~ filterItems', filterItems);
    const [showMenu, setShowMenu] = useState(false);
    const handleClose = () => setShowMenu(false);
    const handleOpen = () => setShowMenu(true);
    return (
        <div className={classes.root}>
            <Button color="secondary" onClick={handleOpen}>
                Advanced Search
            </Button>
            <Dialog fullScreen onClose={handleClose} aria-labelledby="simple-dialog-title" open={showMenu}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Advanced Search
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <FormGroup className={classes.labels_group}>
                        {
                            filterItems.map((item, index) => (
                                <ListItem button>
                                    <FormControlLabel
                                        className={classes.filter_option}
                                        key={index}
                                        control={(
                                            <Checkbox
                                                value={item.value || false}
                                                checked={item.checked || false}
                                                onChange={(e) => handleChange(e, index)}
                                                name={item.name}
                                            />
                                        )}
                                        label={<FormattedMessage id={item.name} />}
                                    />
                                </ListItem>
                            ))
                        }
                    </FormGroup>
                    {/* <ListItem button>
                        <ListItemText primary="Phone ringtone" secondary="Titania" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                    </ListItem> */}
                </List>
            </Dialog>
        </div>
    );
}

MobileFilters.propTypes = {

};

export default MobileFilters;
