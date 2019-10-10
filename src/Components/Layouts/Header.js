import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
//import MenuIcon from '@material-ui/icons/Menu';



export default props => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" color="inherit">
                    Exercise Database
                </Typography>
            </Toolbar>
        </AppBar>
    );
}