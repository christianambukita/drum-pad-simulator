import {INTER_CONTROL} from '../actions/actionTypes'

const initialState = {
    q: 500,
    w: 500,
    e: 500,
    a: 500,
    s: 500,
    d: 500,
    z: 500,
    x: 500,
    c: 500,
    rec1: 500,
    rec2: 500,
    rec3: 500
};

function intervalReducer(state = initialState, action){
    switch(action.type){
        case INTER_CONTROL:
            return {...state, [action.payload.key]: action.payload.inter}
        default:
            return state
    }
}

export default intervalReducer