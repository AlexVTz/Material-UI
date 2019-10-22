import React from 'react';
import { FormControl, InputLabel, Select, TextField } from '@material-ui/core';

const Form = (props) => {
    return (
        <div>
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
                    value={values.muscle}
                    onChange={handleSelectChange}
                    inputProps={{
                        name: 'muscle',
                        id: 'muscle-simple',
                    }}
                >
                    {muscles.map((option, i) => (
                        <MenuItem key={"sel" + option.value + i} value={option.value}>
                            {option.label}
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
                margin="normal"
            />
        </div>
    )
}

export default Form;