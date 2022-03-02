import { useState, useEffect } from 'react';
import {
    Grid, Box, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import Image from 'next/image';
import { Filters, SearchBar } from './components';
import { PageTitle } from '../index';
import style from './style';

const options = [{
    name: 'filters.options.Psychotherapy',
    value: 'Psychotherapy',
    checked: false,
}, {
    name: 'filters.options.Psychoanalysis',
    value: 'Psychoanalysis',
    checked: false,
}, {
    name: 'filters.options.Sextherapy',
    value: 'Sex_therapy',
    checked: false,
}];

function ServiceList(props) {
    const {
        title, imageSrc, filterOptions, description, data, onFetch,
    } = props;
    const [state, setState] = useState(filterOptions);

    const handleChange = (event, index) => {
        const newArr = [...state];
        newArr[index].checked = event.target.checked;
        setState(newArr);
    };

    const handleDelete = (index) => {
        const newArr = [...state];
        newArr[index].checked = false;
        setState(newArr);
    };

    const clearCheckboxFunc = () => {
        setState(options);
    };
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = style();

    useEffect(() => {
        onFetch();
    }, []);
    return (
        <Grid container>
            <PageTitle>
                <FormattedMessage id={title || 'Title'} />
            </PageTitle>
            <Grid container wrap="nowrap" direction="row" className={classes.root}>
                <Grid item xs={12} sm={2.5} direction="column" className={classes.filter_section}>
                    <div className={classes.img_ctn}>
                        <Image
                            src={imageSrc}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                    {
                        matches ? null : (
                            <Filters
                                filterTitle="list.health_sessions"
                                handleChange={handleChange}
                                clearCheckboxFunc={clearCheckboxFunc}
                                state={state}
                            />
                        )
                    }
                </Grid>
                <Grid item xs={12} sm={9.5} direction="column">
                    <Box className={classes.root_description}>
                        <Typography fontFamily="Roboto" fontWeight={300}>
                            <FormattedMessage id={description || 'Description'} />
                        </Typography>

                    </Box>
                    <SearchBar
                        state={state}
                        handleChange={handleChange}
                        clearCheckboxFunc={clearCheckboxFunc}
                        handleDelete={handleDelete}
                        people={data}
                        handleSearch={onFetch}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

ServiceList.propTypes = {
    title: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    filterOptions: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
};

export default ServiceList;
