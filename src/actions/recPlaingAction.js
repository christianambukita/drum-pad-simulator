function recPlayingAction(type, record, index) {
	return {
		type,
		payload: {
			record,
			index,
		},
	};
}

export default recPlayingAction;
