import {
    Box, Grid, TextField, Button, Chip, FormControl, InputLabel, Select, MenuItem,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import Pagination from '@material-ui/lab/Pagination';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { MobileFilters } from '../index';
import { ProfileCard } from '../../..';
import style from './style';

function SearchBar(props) {
    const classes = style();
    const {
        state, handleDelete, people, handleChange, clearCheckboxFunc, handleSearch,
    } = props;
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesUp = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <Grid container className={classes.root}>
            <Grid direction="row" className={classes.container}>
                <Grid className={classes.search_field_container}>
                    <TextField
                        className={classes.search_field}
                        id="outlined-Search"
                        label={<FormattedMessage id="serachBar.message" />}
                        type="text"
                        name="search"
                        autoComplete="search"
                        variant="filled"
                        shrink
                        InputProps={{
                            disableUnderline: true,
                        }}
                    />
                </Grid>
                <Grid className={classes.search_btn_container}>
                    <Button variant="contained" color="secondary" onClick={handleSearch}>
                        <FormattedMessage id="common.search" />
                    </Button>
                </Grid>
            </Grid>
            {
                matchesUp ? null : (
                    <Box display="flex" direction="row" mt={1}>
                        <MobileFilters
                            filterItems={state}
                            handleChange={handleChange}
                            clearCheckboxFunc={clearCheckboxFunc}
                        />
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
                    </Box>
                )
            }

            <Grid container direction="row" className={classes.search_middle} data-testid="searchBar">
                <Grid item sm={9}>
                    <Box fontWeight={500} className={classes.counter_data}>
                        <FormattedMessage id="service.number_items" values={{ value: people.length || 0 }} />
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
                {
                    matches ? null : (
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
                    )
                }

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
    people: PropTypes.array.isRequired,
    state: PropTypes.array.isRequired,
    handleSearch: PropTypes.func.isRequired,
    clearCheckboxFunc: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default SearchBar;
