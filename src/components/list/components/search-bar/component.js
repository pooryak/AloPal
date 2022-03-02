import {
    Box, Typography, Grid, TextField, Button, Chip, FormControl, InputLabel, Select, MenuItem,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';
import { ProfileCard } from '../../..';
import style from './style';

function SearchBar(props) {
    const classes = style();
    const {
        state, options, handleDelete, people,
    } = props;
    return (
        <Grid container className={classes.root}>
            <Grid direction="row" className={classes.container}>
                <Grid className={classes.search_field_container}>
                    <TextField
                        className={classes.search_field}
                        id="outlined-Search"
                        label="Search in Session/Course Name or  Doctor/Tutor Name"
                        type="text"
                        name="search"
                        autoComplete="search"
                        variant="outlined"
                        defaultValue="e.g English, John Smith"
                        shrink
                    />
                </Grid>
                <Grid className={classes.search_btn_container}>
                    <Button variant="contained" color="primary">
                        Submit
                    </Button>
                </Grid>
            </Grid>
            <Grid container direction="row" className={classes.search_middle} data-testid="searchBar">
                <Grid item sm={9}>
                    <Box fontWeight={500}>
                        23 Items
                    </Box>
                    {
                        state.map((item, index) => {
                            if (item.checked) {
                                return (
                                    <Chip
                                        key={item.name}
                                        onDelete={() => handleDelete(index)}
                                        className={classes.chip}
                                        label={<FormattedMessage id={item.name} />}
                                    />
                                );
                            }
                        })
                    }

                </Grid>
                <Grid item sm={3}>
                    <FormControl variant="outlined" className={classes.form_row}>
                        <InputLabel id="demo-simple-select-outlined-label"><FormattedMessage id="pb.mostrecent" /></InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label={<FormattedMessage id="form.currency" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

            </Grid>
            <Grid container direction="row" className={classes.card_container}>
                {
                    people.map((item) => <ProfileCard xs="100%" sm="30%" key={item.id} data={item} />)
                }
            </Grid>
            <Grid className={classes.pagination}>
                <Pagination count={2} />
            </Grid>
        </Grid>
    );
}

SearchBar.propTypes = {

};

export default SearchBar;
