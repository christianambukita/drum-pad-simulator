import { SET_RECORD } from './actionTypes';

function setRecordActionCreator(index, record) {
	return {
		type: SET_RECORD,
		payload: {
			[index]: record,
		},
	};
}

export default setRecordActionCreator;
