import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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

const CreateDialog = (props) => {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        title: '',
        muscles: '',
        description: ''
    })

    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        if(values.title !== '' && values.muscle !== '' && values.description !== '')
            props.addNewExercise(values);
        
            setValues({
            title: '',
            muscles: '',
            description: ''
        })
        setOpen(false);
    };

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSelectChange = event => {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <div>
            <Fab size="medium" aria-label="add" color="primary" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create a New Exercise</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please Fill the form below
                </DialogContentText>
                    <TextField
                        id="exercise-title"
                        label="Title"
                        margin="dense"
                        onChange={handleChange('title')}
                    />
                    <br></br>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="muscle-simple">Muscle</InputLabel>
                        <Select
                            value={values.muscles}
                            onChange={handleSelectChange}
                            inputProps={{
                                name: 'muscles',
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
                        multiline
                        rows="4"
                        defaultValue=""
                        className={classes.textField}
                        margin="normal"
                        onChange={handleChange('description')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateDialog;