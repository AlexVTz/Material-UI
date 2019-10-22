import { ExerciseConstans } from '../constants/constants';

const initialState = {
    showWarning: false,
    information: {
        id: '',
        title: '',
        muscle: '',
        description: ''
    },
    total: {},
    selected: {},
    title: 'Welcome',
    description: 'This is a brand new application made for youuu'
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ExerciseConstans.SELECT_EXERCISE:
            state = {...state, title: action.payload.title, description: action.payload.description}
        default:
            return state
    }
}

export default rootReducer;