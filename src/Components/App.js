import React, { useState, useEffect } from 'react';
import { Header, Footer } from './Layouts/index';
import Exercises from './Exercises/index';
import { exercises as exercisesInfo, muscles as musclesInfo } from '../store'

const App = () => {

    const [muscles, setMuscles] = useState(musclesInfo);
    const [exercises, setExercises] = useState(getExerciseByMuscles());
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
            setExercises(getExerciseByMuscles())
        else {
            let specificMuscle = Object.entries(exercisesInfo.reduce((exercises, exercise) => {
                const { muscles } = exercise;
                
                if(muscles === muscle){
                    exercises[muscles] = exercises[muscles]
                    ? [exercises[muscles], exercise]
                    : exercise;
                }
    
                return exercises;
            }, {}))
            setExercises(specificMuscle);
        }
    }

    function getExerciseByMuscles() {
        return Object.entries(exercisesInfo.reduce((exercises, exercise) => {
            const { muscles } = exercise;

            exercises[muscles] = exercises[muscles]
                ? [exercises[muscles], exercise]
                : exercise;

            return exercises;
        }, {}))
    }

    return (
        <React.Fragment>
            <Header muscles={muscles} />

            <Exercises exercises={exercises} rightPaneInfo={rightPaneInfo} setTitleAndDescription={setTitleAndDescription} />

            <Footer muscles={muscles} setSpecificExercises={setSpecificExercises} />
        </React.Fragment>
    );

}

export default App;