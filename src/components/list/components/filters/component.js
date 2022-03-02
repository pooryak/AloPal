import {
    Grid, Box, IconButton, Typography, FormControl, FormLabel,
    FormGroup, FormControlLabel, Checkbox, Divider,

} from '@material-ui/core';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ClearIcon from '@material-ui/icons/Clear';
import FilterListIcon from '@material-ui/icons/FilterList';
import style from './style';

function Filters(props) {
    const classes = style();
    const {
        filterTitle, handleChange, clearCheckboxFunc, state,
    } = props;

    return (
        <Grid item  className={classes.root}>
            <Grid container direction="row" justifyContent="space-between" wrap="nowrap">
                <Box direction="row" display="flex" alignItems="center">
                    <FilterListIcon className={classes.filter_icon} />
                    <FormattedMessage id="list.filters" />
                </Box>
                <Grid className={classes.btn_remove}>
                    <IconButton aria-label="delete" onClick={clearCheckboxFunc}>
                        <Box className={classes.filter_clear}>
                            <FormattedMessage id="list.clear_filters" />
                        </Box>
                        <ClearIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Box display="flex" direction="column" alignSelf="stretch">
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">
                        <Typography component="p" className={classes.filter_title}>
                            <FormattedMessage id={filterTitle} />
                        </Typography>
                    </FormLabel>
                    <FormGroup>
                        {
                            state.map((item, index) => (
                                <FormControlLabel
                                    className={classes.filter_option}
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
                            ))
                        }
                    </FormGroup>
                </FormControl>
                <Divider variant="middle" />
            </Box>
        </Grid>
    );
}

Filters.propTypes = {

};

export default Filters;
