import {
	ONGOING_MODE,
	ONGOING_MODE_RESET,
	REC_MODE,
	INTERVAL,
	PLAY,
} from '../actions/actionTypes';

const onGoingMode = {
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
	rec3: false,
};

const recMode = {
	rec1: false,
	rec2: false,
	rec3: false,
};

export const onGoingModeReducer = (state = onGoingMode, action) => {
	switch (action.type) {
		case ONGOING_MODE:
			let key = action.payload.key;
			console.log(key);
			return { ...state, [key]: !state[key] };
		case ONGOING_MODE_RESET:
			return { ...state, ...onGoingMode };
		default:
			return state;
	}
};

export const recModeReducer = (state = recMode, action) => {
	switch (action.type) {
		case REC_MODE:
			let key = action.payload.key;
			return { ...recMode, [key]: !state[key] };
		case INTERVAL:
			return recMode;
		case PLAY:
			return recMode;
		default:
			return state;
	}
};
