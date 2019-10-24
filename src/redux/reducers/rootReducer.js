import { ExerciseConstans } from '../constants/constants';

const initialState = {
    showWarning: false,
    showEdit: false,
    muscles: [],
    information: {
        id: '',
        title: '',
        muscle: '',
        description: '',
        index: -1,
        oldMuscle: ''
    },
    total: {},
    selected: {},
    title: 'Welcome',
    description: 'This is a brand new application made for youuu'
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ExerciseConstans.SET_MUSCLES:
            return {...state, muscles: action.payload}
        case ExerciseConstans.SELECT_EXERCISE:
            return {...state, title: action.payload.title, description: action.payload.description}
        case ExerciseConstans.SHOW_EDIT:
            return {...state, showEdit: action.payload}
        case ExerciseConstans.SET_EDIT_FORM:
            return {...state, information: action.payload}
        case ExerciseConstans.CREATE_EXERCISE:
            return {...state, total: action.payload}
        case ExerciseConstans.SET_TOTAL_EXERCISES:
            return {...state, total: action.payload}
        case ExerciseConstans.SET_SELECTED_EXERCISES:
            return {...state, selected: action.payload}
        case ExerciseConstans.DELETE_EXERCISE:
            return {...state, total: action.payload, selected: action.payload}
        default:
            return state
    }
}

export default rootReducer;