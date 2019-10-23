import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import CreateExercise from '../Exercises/Dialogs/Create';
//import MenuIcon from '@material-ui/icons/Menu';
import { createNewExercise } from '../../redux/actions/rootActions';
import { validateExistance } from '../Utils/index';



const Header = props => {

    const addNewExercise = ({title, muscle, description, id}) => {
        id = title.replace(/\s/g,"-").toLowerCase();
        let existance = validateExistance(title, muscle, props.total)
        if(existance){
            //setForm({...form, show: true});
            return;
        }
        const newExercises = {...props.total};
        console.log("MOM",newExercises[muscle])
        newExercises[muscle].push({title, muscle, description, id})
        props.createNewExercise(newExercises);
    }

    return (
        <AppBar position="static">
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
        total: state.total
    }
}

const mapDispatchToProps = () => {
    return {
        createNewExercise
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);