import React from 'react';
import { Header, Footer } from './Layouts/index';
import Exercises from './Exercises/index';
import { exercises, muscles } from '../store'

class App extends React.Component {

    state = {
        muscles,
        exercises
    }

    getExerciseByMuscles() {
        return Object.entries(this.state.exercises.reduce((exercises, exercise) => {
            const { muscles } = exercise;

            exercises[muscles] = exercises[muscles] 
                ? [exercises[muscles], exercise]
                : exercise;

            return exercises;
        }, {}))
    }

    render() {
        const exercises = this.getExerciseByMuscles();

        return (
            <React.Fragment>
                <Header />

                <Exercises exercises={exercises} />

                <Footer muscles={this.state.muscles} />
            </React.Fragment>
          );   
    }
}

export default App;