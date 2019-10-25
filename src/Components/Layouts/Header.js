import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import CreateExercise from '../Exercises/Dialogs/Create';
//import MenuIcon from '@material-ui/icons/Menu';
import { createNewExercise } from '../../redux/actions/rootActions';
import { validateExistance } from '../Utils/index';



const Header = props => {

    const addNewExercise = ({title, muscles, description, id}) => {
        id = title.replace(/\s/g,"-").toLowerCase();
        let existance = validateExistance(title, muscles, props.total)
        if(existance){
            //setForm({...form, show: true});
            return;
        }
        const newExercises = {...props.total};
        console.log("MOM",newExercises[muscles])
        newExercises[muscles].push({title, muscles, description, id})
        props.createNewExercise(newExercises);
    }

    return (
        <AppBar position="static" style={{flex: '0 1 auto'}}>
            <Toolbar>
                <Typography variant="h5" color="inherit" style={{flex: 1}}>
                    Exercise Database
                </Typography>
                <CreateExercise muscles={props.muscles} addNewExercise={addNewExercise}/>
            </Toolbar>
        </AppBar>
    );
}

const mapStateToProps = function (state) {
    return {
        total: state.total,
        muscles: state.muscles
    }
}

const mapDispatchToProps = () => {
    return {
        createNewExercise
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);