import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Header, Footer } from './Layouts/index';
import Exercises from './Exercises/index';
import { exercises as exercisesInfo, muscles as musclesInfo } from '../store';
import { setEditForm, setExercises as selectedEx }from '../redux/actions/rootActions';

const App = () => {

    const [muscles, setMuscles] = useState(musclesInfo);
    const [exercises, setExercises] = useState(
        () => {
            const info = getExerciseByMuscles();
            console.log("M",info);
            return {total: info, selected: info} 
        })

    useEffect(() => {
        const info = getExerciseByMuscles();
        selectedEx(info);
    }, [])


    const setSpecificExercises = (muscle) => {
        if(muscle === 'all')
            setExercises({...exercises, selected: exercises.total})
        else {
            let filteredExercises = exercises.total;
            let specificMuscle = {};
            for (let exercise in filteredExercises){
                if(exercise === muscle){
                    specificMuscle[exercise] = filteredExercises[exercise];
                    break;
                }
            }
            setExercises({...exercises, selected: specificMuscle});
        }
    }

    const validateExistance = (title, muscle) => {
        const existance = exercises.total.find(e => e[0] === muscle )
            .find(e => Array.isArray(e) ).findIndex(e => e.title === title)
        return existance >= 0;
    }

    const addNewExercise = ({title, muscle, description, id}) => {
        id = title.replace(/\s/g,"-").toLowerCase();
        let existance = validateExistance(title, muscle)
        if(existance){
            //setForm({...form, show: true});
            return;
        }
        const newExercises = [...exercises.total];
        let aux = exercises.total.findIndex(e => e[0] === muscle)
        newExercises[aux][1] = Array.isArray(newExercises[aux][1]) 
            ? [...newExercises[aux][1], {title, muscle, description, id}] :
              [newExercises[aux][1], {title, muscle, description, id}]
        setExercises({...exercises, total: newExercises});
    }

    function getExerciseByMuscles() {
        return exercisesInfo.reduce((exercises, exercise) => {
            const { muscles } = exercise;
            exercises[muscles] = exercises[muscles]
                ? [...exercises[muscles], exercise]
                : [exercise];

            return exercises;
        }, {})
    }

    const deleteExercise = ({id, key}) => {
        let filteredExercises = exercises.total;
        for (let muscle in filteredExercises){
            if(muscle === key){
                filteredExercises[muscle] = filteredExercises[muscle].filter(exercise => {
                    return  exercise.id !== id;
                });
                break;
            }
        }
        setExercises({...exercises, total: filteredExercises})
    }

    const editExercise = ({id, key}) => {
        let filteredExercises = exercises.total;
        let found;
        for (let muscle in filteredExercises){
            if(muscle === key){
                found = filteredExercises[muscle].find(exercise => exercise.id === id);
                break;
            }
        }
        setEditForm(found);
    }

    return (
        <React.Fragment>
            <Header muscles={muscles} addNewExercise={addNewExercise} />

            <Exercises exercises={exercises.selected}
                deleteExercise={deleteExercise}
                editExercise={editExercise}  muscles={muscles}/>
            {/* <DuplicatedDialog form={form} setForm={setForm} /> */}

            <Footer muscles={muscles} setSpecificExercises={setSpecificExercises} />
        </React.Fragment>
    );

}

const mapStateToProps = function (state) {
    return {
        title: state.title,
        selected: state.selected,
        total: state.total
    }
}

export default connect(mapStateToProps)(App);