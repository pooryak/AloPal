import { useState } from 'react';
import { Grid, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Filters, SearchBar } from './components';
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

const people = [
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '$40.0',
        duration: '50 Minutes',
        star: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 1,
    },
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '$40.0',
        duration: '50 Minutes',
        star: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 2,
    },
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '$40.0',
        duration: '50 Minutes',
        star: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 3,
    },
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '$40.0',
        duration: '50 Minutes',
        star: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 4,
    },
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '$40.0',
        duration: '50 Minutes',
        star: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 5,
    },

    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '$40.0',
        duration: '50 Minutes',
        star: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 6,
    }, {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '$40.0',
        duration: '50 Minutes',
        star: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 7,
    },
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '$40.0',
        duration: '50 Minutes',
        star: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 8,
    },
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '$40.0',
        duration: '50 Minutes',
        star: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 9,
    },
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '$40.0',
        duration: '50 Minutes',
        star: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 10,
    },
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '$40.0',
        duration: '50 Minutes',
        star: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 11,
    },
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '$40.0',
        duration: '50 Minutes',
        star: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 12,
    },
    {
        name: 'Asghar',
        family: 'Maleki',
        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
        price: '$40.0',
        duration: '50 Minutes',
        star: 3,
        pic: '/assets/image/avatar4.55833b54.svg',
        id: 13,
    },

];

function List(props) {
    const [state, setState] = useState(options);

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
    const classes = style();
    return (
        <Grid container wrap="nowrap">
            <Filters
                filterTitle="list.health_sessions"
                handleChange={handleChange}
                clearCheckboxFunc={clearCheckboxFunc}
                state={state}
            />
            <Box component="div" className={classes.divider} />
            <Grid xs={9}>
                <SearchBar state={state} handleDelete={handleDelete} people={people} />
            </Grid>
        </Grid>
    );
}

List.propTypes = {

};

export default List;
