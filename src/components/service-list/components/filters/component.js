import { memo } from 'react';
import {
    Grid, Box, Button, Typography, FormControl, FormLabel,
    FormGroup, FormControlLabel, Checkbox, Divider,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { FormattedMessage } from 'react-intl';
import TuneIcon from '@material-ui/icons/Tune';
import FilterListIcon from '@material-ui/icons/FilterList';
import style from './style';

function Filters(props) {
    const classes = style();
    const {
        filterTitle, handleChange, clearCheckboxFunc, state,
    } = props;

    return (
        <Grid item className={classes.root}>
            <Grid container direction="row" justifyContent="space-between">
                <Box direction="row" display="flex" alignItems="center" className={classes.filter}>
                    <TuneIcon className={classes.filter_icon} />
                    <FormattedMessage id="list.filters" />
                </Box>
                <Grid className={classes.btn_remove}>
                    <Button variant="outlined" onClick={clearCheckboxFunc}>
                        <FormattedMessage id="list.clear_filters" />
                    </Button>
                </Grid>
            </Grid>
            <Box display="flex" direction="column" alignSelf="stretch">
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">
                        <Typography component="p" className={classes.filter_title}>
                            <FormattedMessage id={filterTitle} />
                        </Typography>
                    </FormLabel>
                    <FormGroup className={classes.labels_group}>
                        {
                            state.map((item, index) => (
                                <FormControlLabel
                                    className={classes.filter_option}
                                    key={index}
                                    control={(
                                        <Checkbox
                                            value={item.value || false}
                                            checked={item.checked || false}
                                            onChange={(e) => handleChange(e, index)}
                                            name={item.name}
                                            icon={<CircleUnchecked className={classes.icon} />}
                                            checkedIcon={<CircleChecked className={classes.icon} />}
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

export default memo(Filters);
