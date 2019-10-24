import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux'
import {
    Grid, Paper, Typography, List, ListItem,
    ListItemText, ListItemSecondaryAction, IconButton
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import ShowPane from './ShowPane/ShowPane';
import { setExercise, deleteExercise, setEditForm } from '../../redux/actions/rootActions';

const styles = {
    Paper: { padding: 20, marginTop: 10, marginBottom: 10 }
}

const Main = props => {

    useEffect(() => {
        console.log("SEL")
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

    const editExercise = ({id, key, i}) => {
        let filteredExercises = {...props.total};
        console.log(filteredExercises);
        let found;
        for (let muscle in filteredExercises){
            if(muscle === key){
                found = filteredExercises[muscle].find(exercise => exercise.id === id);
                break;
            }
        }
        props.setEditForm(found, i, found.muscles);
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
                        props.selected[key].map(({ id, title, description }, i) => {
                            return (
                                <ListItem button key={`Ex-button-${i}`}
                                    onClick={() => props.setExercise({ title, description })}>
                                    <ListItemText primary={title} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="start" aria-label="edit"
                                            onClick={() => editExercise({ id, key, i })}>
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
                    {console.log("SEL1")}
                    { exerciseElements}
                </Paper>
            </Grid>
            <ShowPane />
        </Grid>
    )
}

const mapStateToProps = function (state) {
    return {
        selected: state.selected,
        total: state.total
    }
}

const mapDispatchToProps = () => {
    return {
        setExercise,
        deleteExercise,
        setEditForm
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Main));