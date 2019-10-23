import React, { useEffect, useState } from 'react';
import {
    Grid, Paper, Typography, List, ListItem,
    ListItemText, ListItemSecondaryAction, IconButton
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import Form from './Dialogs/Form';

import { connect } from 'react-redux'
import { setExercise, deleteExercise } from '../../redux/actions/rootActions';

const styles = {
    Paper: { padding: 20, marginTop: 10, marginBottom: 10 }
}

const Main = props => {

    useEffect(() => {
        console.log("SEL",props.selected)
    })

    const deleteExercise = ({id, key}) => {
        let filteredExercises = {...props.total};
        for (let muscle in filteredExercises){
            if(muscle === key){
                filteredExercises[muscle] = filteredExercises[muscle].filter(exercise => {
                    return  exercise.id !== id;
                });
                break;
            }
        }
        props.deleteExercise(filteredExercises)
    }

    const exerciseElements = [];
    for (const key in props.selected) {
        exerciseElements.push(
            <React.Fragment key={`Ex-${key}`}>
                <Typography variant="h6" style={{ textTransform: 'capitalize' }}>
                    {key}
                </Typography>
                <List component="nav">
                    {
                        props.selected[key].map(({ id, title, description, muscles }, i) => {
                            return (
                                <ListItem button key={`Ex-button-${i}`}
                                    onClick={() => props.setExercise({ title, description })}>
                                    <ListItemText primary={title} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="start" aria-label="edit"
                                            onClick={() => props.editExercise({ id, key })}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete"
                                            onClick={() => deleteExercise({ id, key })}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>)
                        })
                    }
                </List>
            </React.Fragment>
        )
    }

    return (
        <Grid container>
            <Grid item xs={6}>
                <Paper style={styles.Paper}>
                    { exerciseElements}
                </Paper>
            </Grid>
            <Grid item xs={6}>
                {props.showEdit ?
                    <Paper style={styles.Paper}>
                        <Form form={props.information} setForm={props.setForm} muscles={props.muscles} />
                    </Paper> :
                    <Paper style={styles.Paper}>
                        <Typography variant="h3" style={{ textTransform: 'capitalize' }}>
                            {props.title}
                        </Typography>
                        <br></br>
                        <Typography variant="body1" style={{ textTransform: 'capitalize' }}>
                            {props.description}
                        </Typography>
                    </Paper>
                }
            </Grid>
        </Grid>
    )
}

const mapStateToProps = function (state) {
    return {
        title: state.title,
        description: state.description,
        showEdit: state.showEdit,
        selected: state.selected,
        total: state.total
    }
}

const mapDispatchToProps = () => {
    return {
        setExercise,
        deleteExercise
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);