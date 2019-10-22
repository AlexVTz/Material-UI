import React from 'react';
import {
    Grid, Paper, Typography, List, ListItem,
    ListItemText, ListItemSecondaryAction, IconButton
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import Form from './Dialogs/Form';

import { connect } from 'react-redux'
import store from '../../redux/store';
import { setExercise } from '../../redux/actions/rootActions';

const styles = {
    Paper: { padding: 20, marginTop: 10, marginBottom: 10 }
}

const Main = props => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Paper style={styles.Paper}>
                    {
                        props.exercises.map(([group, exercise], i) => {
                            return (
                                <React.Fragment key={`Ex-${i}`}>
                                    <Typography variant="h6" style={{ textTransform: 'capitalize' }}>
                                        {group}
                                    </Typography>
                                    <List component="nav">
                                        {
                                            exercise.map(({ id, title, description }, i) => {
                                                return (
                                                    <ListItem button key={`Ex-button-${i}`}
                                                        onClick={() => props.setExercise({ title, description })}>
                                                        <ListItemText primary={title} />
                                                        <ListItemSecondaryAction>
                                                            <IconButton edge="start" aria-label="edit"
                                                                onClick={() => props.editExercise({ id, group })}>
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton edge="end" aria-label="delete"
                                                                onClick={() => props.deleteExercise({ id, group })}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>)
                                            })
                                        }
                                    </List>
                                </React.Fragment>)
                        })
                    }
                </Paper>
            </Grid>
            <Grid item xs={6}>
                {props.form.show ?
                    <Paper style={styles.Paper}>
                        <Form form={props.form} setForm={props.setForm} muscles={props.muscles}/>
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

const mapStateToProps = function(state) {
    return {
      title: state.title,
      description: state.description
    }
  }

  const mapDispatchToProps = () => {
    return {
        setExercise
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);