import { INTER_INCREMENT, INTER_DECREMENT } from '../actions/actionTypes';

const initialState = {
	q: 500,
	w: 450,
	e: 450,
	a: 1000,
	s: 1000,
	d: 1000,
	z: 500,
	x: 500,
	c: 500,
	rec1: 1500,
	rec2: 1500,
	rec3: 1500,
};

function intervalReducer(state = initialState, action) {
	switch (action.type) {
		case INTER_INCREMENT:
			const incKey = action.payload.key;
			const incInterState = state[incKey];
			if (incInterState < 1500)
				return { ...state, [incKey]: incInterState + 50 };
			return state;
		case INTER_DECREMENT:
			const decKey = action.payload.key;
			const decInterState = state[decKey];
			if (decInterState > 0) return { ...state, [decKey]: decInterState - 50 };
			return state;
		default:
			return state;
	}
}

export default intervalReducer;
