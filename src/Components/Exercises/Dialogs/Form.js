import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Form = (props) => {

    const classes = useStyles();

    const handleChange = name => event => {
        const form = { ...props.form };
        form.information[name] = event.target.value;
        props.setForm(form);
    };
    console.log("GUE", props.information)
    return (
        <div>
            <TextField
                id="exercise-title"
                label="Title"
                margin="dense"
                value={props.information.title}
                onChange={handleChange('title')}
            />
            <br></br>
            {/* <FormControl className={classes.formControl}>
                <InputLabel htmlFor="muscle-simple">Muscle</InputLabel>
                <Select
                    value={props.form.information.muscles}
                    onChange={handleChange('muscles')}
                    inputProps={{
                        name: 'muscle',
                        id: 'muscle-simple',
                    }}
                >
                    {props.muscles.map((option, i) => (
                        <MenuItem key={"sel" + option + i} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl> */}
            <br></br>
            <TextField
                id="standard-multiline-static"
                label="Description"
                value={props.information.description}
                onChange={handleChange('description')}
                multiline
                rows="4"
                margin="normal"
            />
        </div>
    )
}

const mapStateToProps = function (state) {
    return {
        information: state.information
    }
}

export default connect(mapStateToProps)(Form);