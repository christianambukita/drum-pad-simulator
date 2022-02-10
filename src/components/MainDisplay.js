import React, { useState, useEffect } from 'react';
import '../css/MainDisplay.css';
import '../css/v-display.css';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
	recMode: state.recMode,
});

const DISPLAY_MSGS = {
	rec: (key) => ({
		header: 'MODE: RECORD',
		messages: [
			`Use keys to record melody. Press ${key.toUpperCase()} to stop recording.`,
			'Record play buttons [R1, R2, R3] are disabled during recording',
		],
	}),
	play: {
		header: 'MODE: PLAY',
		messages: [
			'To loop sound activate specific key on left panel and set time interval',
			'To start recording press one of REC buttons',
			'Record play buttons will be enabled once corresponding recording is created',
			'Recordings loop interval time is increased by recordings duration',
		],
	},
};

function MainDisplay({ recMode }) {
	const [display, setDisplay] = useState(DISPLAY_MSGS.play);
	const [msg, setMsg] = useState('');
	const [counter, setCounter] = useState(0);
	const [interval, _setInterval] = useState();
	const displayInterval = 8000;

	useEffect(() => {
		let recActive = false;
		Object.keys(recMode).forEach((key) => {
			if (recMode[key]) recActive = key;
		});
		if (recActive) {
			setDisplay(DISPLAY_MSGS.rec(recActive));
		} else {
			setDisplay(DISPLAY_MSGS.play);
		}
	}, [recMode]);

	//display loop
	function startLoop() {
		setMsg(display.messages[0]);
		let counter = 0;
		setCounter(counter);
		const newInterval = setInterval(() => {
			if (counter < display.messages.length - 1) counter++;
			else counter = 0;
			setCounter(counter);
		}, displayInterval);
		_setInterval(newInterval);
	}

	// restart loop on display change
	useEffect(() => {
		if (interval) clearInterval(interval);
		startLoop();
	}, [display]);

	// update displayed message
	useEffect(() => {
		setMsg(display.messages[counter]);
	}, [counter]);

	return (
		<div className='main-display-container flex-container'>
			<div className='v-display-border main-display-border'>
				<div className='v-display-shadow main-display'>
					<p className='main-display-header'>{display.header}</p>
					<p className='main-display-message'>{msg}</p>
				</div>
			</div>
		</div>
	);
}

export default connect(mapStateToProps)(MainDisplay);
