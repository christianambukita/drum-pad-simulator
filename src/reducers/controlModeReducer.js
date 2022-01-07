import { PLAY, RECORD, INTERVAL } from '../actions/actionTypes';

const initialState = PLAY; //true = PLAY, false = RECORD

function controlModeReducer(state = initialState, action) {
	switch (action.type) {
		case PLAY:
			return PLAY;
		case RECORD:
			return RECORD;
		case INTERVAL:
			return INTERVAL;
		default:
			return state;
	}
}

export default controlModeReducer;
