import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Header, Footer } from './Layouts/index';
import Exercises from './Exercises/index';
import { exercises as exercisesInfo, muscles as musclesInfo } from '../store';
import { setEditForm, setExercises, setSelectedExercises, deleteExercise }from '../redux/actions/rootActions';

const App = () => {
    const total = useSelector(state => state.total)
    const [muscles, setMuscles] = useState(musclesInfo);

    useEffect(() => {
        const info = getExerciseByMuscles();
        setExercises(info);
    }, [])


    const setSpecificExercises = (muscle) => {
        if(muscle === 'all')
            setExercises(total)
        else {
            let filteredExercises = total;
            let specificMuscle = {};
            for (let exercise in filteredExercises){
                if(exercise === muscle){
                    specificMuscle[exercise] = filteredExercises[exercise];
                    break;
                }
            }
            setSelectedExercises(specificMuscle);
        }
    }

    const validateExistance = (title, muscle) => {
        for ( let element in total) {
            if(element === muscle) {
                return  total[element].findIndex(e => e.title === title) >= 0;
            }
        }
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


    const editExercise = ({id, key}) => {
        let filteredExercises = total;
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
            <Header muscles={muscles} />

            <Exercises
                editExercise={editExercise}  muscles={muscles}/>
            {/* <DuplicatedDialog form={form} setForm={setForm} /> */}

            <Footer muscles={muscles} setSpecificExercises={setSpecificExercises} />
        </React.Fragment>
    );

}


export default App;