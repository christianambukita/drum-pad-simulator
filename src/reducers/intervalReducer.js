import {INTER_INCREMENT, INTER_DECREMENT} from '../actions/actionTypes'

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
        case INTER_INCREMENT:
            const incKey = action.payload.key;
            const incInterState = state[incKey];
            if(incInterState < 1500 ) return {...state, [incKey]: incInterState + 50};
            break;
        case INTER_DECREMENT:
            const decKey = action.payload.key;
            const decInterState = state[decKey];
            if(decInterState > 0 ) return {...state, [decKey]: decInterState - 50};
        default:
            return state
    }
}

export default intervalReducer