import { REC_PLAING_ADD, REC_PLAING_REM } from '../actions/actionTypes';

const initState = {
	rec1: [],
	rec2: [],
	rec3: [],
};

function recPlayingReducer(state = initState, action) {
	switch (action.type) {
		case REC_PLAING_ADD:
			let newRecArr = [...state[action.payload.record]];
			newRecArr.push(action.payload.index);
			return { ...state, [action.payload.record]: newRecArr };

		case REC_PLAING_REM:
			let newRecArr2 = [...state[action.payload.record]].filter(
				(elem) => elem != action.payload.index
			);
			return { ...state, [action.payload.record]: newRecArr2 };

		default:
			return state;
	}
}

export default recPlayingReducer;
