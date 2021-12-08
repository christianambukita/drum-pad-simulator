import {SET_RECORD} from '../actions/actionTypes'

const initialState = {
    rec1: [],
    rec2: [],
    rec3: []
}

function recordReducer(state = initialState, action){
    switch(action.type){
        case SET_RECORD:
            return ({...state, ...action.payload})
        default:
            return state
    }
}

export default recordReducer