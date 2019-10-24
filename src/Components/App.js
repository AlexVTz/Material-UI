import React, { useEffect } from 'react';
import { Header, Footer } from './Layouts/index';
import Exercises from './Exercises/index';
import { exercises as exercisesInfo, muscles as musclesInfo } from '../store';
import { setExercises, setMuscles }from '../redux/actions/rootActions';

const App = () => {

    useEffect(() => {
        const info = getExerciseByMuscles();
        setExercises(info);
        setMuscles(musclesInfo);
    }, [])

    function getExerciseByMuscles() {
        return exercisesInfo.reduce((exercises, exercise) => {
            const { muscles } = exercise;
            exercises[muscles] = exercises[muscles]
                ? [...exercises[muscles], exercise]
                : [exercise];

            return exercises;
        }, {})
    }

    return (
        <React.Fragment>
            <Header />

            <Exercises />
            {/* <DuplicatedDialog form={form} setForm={setForm} /> */}

            <Footer />
        </React.Fragment>
    );

}


export default App;