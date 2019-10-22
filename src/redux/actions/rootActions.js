import store from '../store';
import { ExerciseConstans } from '../constants/constants';

export const setExercise = ({ title, description }) => {
    store.dispatch({
        type: ExerciseConstans.SELECT_EXERCISE,
        payload: { title, description }
    })
}