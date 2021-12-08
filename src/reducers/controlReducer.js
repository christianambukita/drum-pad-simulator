import {ONGOING_MODE, REC_MODE, INTERVAL, PLAY} from '../actions/actionTypes'


const  onGoingMode = {
    q: false,
    w: false,
    e: false,
    a: false,
    s: false,
    d: false,
    z: false,
    x: false,
    c: false,
    rec1: false,
    rec2: false,
    rec3: false
};

const recMode = {
    rec1: false,
    rec2: false,
    rec3: false
}


const modeReducerCreator = (type, initState) => (state = initState, action) =>{
    switch(action.type){
        case(type):
            let key = action.payload.key;
            console.log(key);
            return ({...state, [key]: !state[key]})
        default:
            return state
    }
}

const recModeReducerr = (state = recMode, action) =>{
    switch(action.type){
        case REC_MODE:
            let key = action.payload.key;
            return ({...recMode, [key]: !state[key]})
        case INTERVAL:
            return recMode
        case PLAY:
            return recMode
        default:
            return state
    }
}



export const onGoingModeReducer = modeReducerCreator(ONGOING_MODE, onGoingMode);
export const recModeReducer = recModeReducerr