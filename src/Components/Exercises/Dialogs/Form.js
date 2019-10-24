import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, InputLabel, Select, TextField, Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import { connect } from 'react-redux';
import { setEditForm, setExercises, setExercise } from '../../../redux/actions/rootActions'

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
        const form = { ...props.information };
        form[name] = event.target.value;
        setEditForm(form);
    };

    const handleUpdate = () => {
        const form = { ...props.information };
        const total = {...props.total};
        if(form.muscles !== form.oldMuscle){
            total[form.muscles].push({id: form.id, title: form.title, 
                description: form.description, muscles: form.muscles})
                total[form.oldMuscle].splice(form.index, 1)
        } else {
            total[form.muscles][form.index] = {id: form.id, title: form.title, 
                description: form.description, muscles: form.muscles}
        }
        
        setExercises(total);
        setExercise({title: form.title, description: form.description});
    }

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
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="muscle-simple">Muscle</InputLabel>
                <Select
                    value={props.information.muscles}
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
            </FormControl>
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
            <br></br>
            <Button onClick={handleUpdate} color="primary">
                Update
            </Button>
        </div>
    )
}

const mapStateToProps = function (state) {
    return {
        total: state.total,
        information: state.information,
        muscles: state.muscles
    }
}

export default connect(mapStateToProps)(Form);