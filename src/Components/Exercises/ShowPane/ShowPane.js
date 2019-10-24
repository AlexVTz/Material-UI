import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import Form from '../Dialogs/Form';

const styles = {
    Paper: { padding: 20, marginTop: 10, marginBottom: 10 }
}

const ShowPane = (props) => {

    return (
        <Grid item xs={6}>
            {props.showEdit ?
                <Paper style={styles.Paper}>
                    <Form form={props.information} />
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
    )
}

const mapStateToProps = function (state) {
    return {
        title: state.title,
        description: state.description,
        showEdit: state.showEdit
    }
}

export default connect(mapStateToProps)(ShowPane);