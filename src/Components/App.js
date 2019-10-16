import React, { useState, useEffect } from 'react';
import { Header, Footer } from './Layouts/index';
import Exercises from './Exercises/index';
import { exercises as exercisesInfo, muscles as musclesInfo } from '../store'

const App = () => {

    const [muscles, setMuscles] = useState(musclesInfo);
    const [exercises, setExercises] = useState(
        () => {
            const info = getExerciseByMuscles();
            return {total: info, selected: info} 
        })
    const [rightPaneInfo, setRightPaneInfo] = useState({
        title: 'Welcome',
        description: 'This is a brand new application made for you'
    })

    useEffect(() => {
    }, [])

    const setTitleAndDescription = (exercise) => {
        setRightPaneInfo(exercise);
    }

    const setSpecificExercises = (muscle) => {
        if(muscle === 'all')
            setExercises({...exercises, selected: exercises.total})
        else {
            let filteredExercises = exercises.total;
            let specificMuscle = [filteredExercises.find(exercise => {
                if(exercise[0] === muscle)
                    return exercise;
            })]
            setExercises({...exercises, selected: specificMuscle});
        }
    }

    const addNewExercise = ({title, muscle, description, id}) => {
        id = title.replace(/\s/g,"-").toLowerCase();
        const newExercises = [...exercises.total];
        let aux = exercises.total.findIndex(e => e[0] === muscle)
        newExercises[aux][1] = Array.isArray(newExercises[aux][1]) 
            ? [...newExercises[aux][1], {title, muscle, description, id}] :
              [newExercises[aux][1], {title, muscle, description, id}]
        setExercises({...exercises, total: newExercises});
    }

    function getExerciseByMuscles() {
        return Object.entries(exercisesInfo.reduce((exercises, exercise) => {
            const { muscles } = exercise;
            exercises[muscles] = exercises[muscles]
                ? [...exercises[muscles], exercise]
                : [exercise];

            return exercises;
        }, {}))
    }

    const deleteExercise = ({id, group}) => {
        let filteredExercises = exercises.total;
        let firstIndex = filteredExercises.findIndex(e => e[0] === group);
        let secondIndex = filteredExercises[firstIndex][1].findIndex(e => e.id === id && e.muscles === group);
        filteredExercises[firstIndex][1].splice(secondIndex,1);
        setExercises({...exercises, total: filteredExercises})
    }

    return (
        <React.Fragment>
            <Header muscles={muscles} addNewExercise={addNewExercise} />

            <Exercises exercises={exercises.selected} rightPaneInfo={rightPaneInfo} 
                setTitleAndDescription={setTitleAndDescription} deleteExercise={deleteExercise} />

            <Footer muscles={muscles} setSpecificExercises={setSpecificExercises} />
        </React.Fragment>
    );

}

export default App;