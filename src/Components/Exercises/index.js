import React from 'react';
import {
    Grid, Paper, Typography, List, ListItem,
    ListItemText, ListItemSecondaryAction, IconButton
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

const styles = {
    Paper: { padding: 20, marginTop: 10, marginBottom: 10 }
}

export default props => {
    console.log("alf", props.exercises)
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
                                            exercise.map(({id, title, description }, i) => {
                                                return (
                                                    <ListItem button key={`Ex-button-${i}`}
                                                        onClick={() => props.setTitleAndDescription({ title, description })}>
                                                        <ListItemText primary={title} />
                                                        <ListItemSecondaryAction onClick={() => props.deleteExercise({id, group})}>
                                                            <IconButton edge="end" aria-label="comments">
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
                <Paper style={styles.Paper}>
                    <Typography variant="h3" style={{ textTransform: 'capitalize' }}>
                        {props.rightPaneInfo.title}
                    </Typography>
                    <br></br>
                    <Typography variant="body1" style={{ textTransform: 'capitalize' }}>
                        {props.rightPaneInfo.description}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}