import React, { useState, useEffect } from 'react';
import { Header, Footer } from './Layouts/index';
import Exercises from './Exercises/index';
import { exercises as exercisesInfo, muscles as musclesInfo } from '../store';

const App = () => {

    const [muscles, setMuscles] = useState(musclesInfo);
    const [form, setForm] = useState({
        show: false,
        information: {
            id: '',
            title: '',
            muscle: '',
            description: ''
        }
    });
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
        setForm({...form, show: false})
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

    const validateExistance = (title, muscle) => {
        const existance = exercises.total.find(e => e[0] === muscle )
            .find(e => Array.isArray(e) ).findIndex(e => e.title === title)
        return existance >= 0;
    }

    const addNewExercise = ({title, muscle, description, id}) => {
        id = title.replace(/\s/g,"-").toLowerCase();
        let existance = validateExistance(title, muscle)
        if(existance){
            setForm({...form, show: true});
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

    const editExercise = ({id, group}) => {
        let filteredExercises = exercises.total;
        let firstIndex = filteredExercises.findIndex(e => e[0] === group);
        let secondIndex = filteredExercises[firstIndex][1].findIndex(e => e.id === id && e.muscles === group);
        console.log(filteredExercises[firstIndex][1][secondIndex]);
        console.log("N", filteredExercises);
        setForm({...form, show: true, information: filteredExercises[firstIndex][1][secondIndex]})
    }

    return (
        <React.Fragment>
            {console.log(muscles)}
            <Header muscles={muscles} addNewExercise={addNewExercise} />

            <Exercises exercises={exercises.selected} rightPaneInfo={rightPaneInfo} 
                setTitleAndDescription={setTitleAndDescription} deleteExercise={deleteExercise}
                editExercise={editExercise} form={form} setForm={setForm} muscles={muscles}/>
            {/* <DuplicatedDialog form={form} setForm={setForm} /> */}

            <Footer muscles={muscles} setSpecificExercises={setSpecificExercises} />
        </React.Fragment>
    );

}

export default App;