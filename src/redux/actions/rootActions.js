import store from '../store';
import { ExerciseConstans } from '../constants/constants';

const showEdit = (show = false) => {
    store.dispatch({
        type: ExerciseConstans.SHOW_EDIT,
        payload: show
    })
}


export const setExercise = ({ title, description }) => {
    store.dispatch({
        type: ExerciseConstans.SELECT_EXERCISE,
        payload: { title, description }
    })
    showEdit();
}

export const setEditForm = (information) => {
    store.dispatch({
        type: ExerciseConstans.SET_EDIT_FORM,
        payload: information
    })
    showEdit(true);
}

export const setExercises = (info) => {
    store.dispatch({
        type: ExerciseConstans.SET_SELECTED_EXERCISES,
        payload: info
    })

    store.dispatch({
        type: ExerciseConstans.SET_TOTAL_EXERCISES,
        payload: info
    })
}

export const setSpecificMuscle = () => {

}