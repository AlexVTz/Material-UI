import React from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText } from '@material-ui/core';

const styles = {
    Paper: { padding: 20, marginTop: 10, marginBottom: 10 }
}

export default props => {
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
                                            Array.isArray(exercise) ?
                                                exercise.map(({ title, description }, i) => {
                                                    return (
                                                        <ListItem button key={`Ex-button-${i}`} 
                                                            onClick={() => props.setTitleAndDescription({title, description})}>
                                                            <ListItemText primary={title} />
                                                        </ListItem>)
                                                }) :
                                                <ListItem button onClick={() => 
                                                    props.setTitleAndDescription({title: exercise.title, description: exercise.description})}>
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