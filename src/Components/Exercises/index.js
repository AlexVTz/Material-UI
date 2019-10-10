import React from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { exercises } from '../../store';

const styles = {
    Paper: { padding: 20, marginTop: 10, marginBottom: 10 }
}

export default props => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Paper style={styles.Paper}>
                    {
                        props.exercises.map(([group, exercise]) => {
                            console.log(exercise)
                            return (
                                <React.Fragment>
                                    <Typography variant="h6" style={{ textTransform: 'capitalize' }}>
                                        {group}
                                    </Typography>
                                    <List component="nav">
                                        {
                                            Array.isArray(exercise) ?
                                            exercise.map( ({title}) => {
                                                return (<ListItem button>
                                                    <ListItemText primary={title} />
                                                </ListItem>)
                                            }) : 
                                            <ListItem button>
                                                <ListItemText primary={exercise.title} />
                                            </ListItem>
                                        }
                                    </List>
                                </React.Fragment>)
                        })
                    }
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper style={styles.Paper}>
                    Right Pane
                </Paper>
            </Grid>
        </Grid>
    )
}