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
			'testMsg',
		],
	}),
	play: {
		header: 'MODE: PLAY',
		messages: [
			'To loop sound activate specific key on left panel and set time interval',
			'To start recording press one of REC buttons',
			'Record play buttons will be enabled once corresponding record is created',
		],
	},
};

function MainDisplay({ recMode }) {
	const [display, setDisplay] = useState(DISPLAY_MSGS.play);
	const [msg, setMsg] = useState('');
	const [counter, setCounter] = useState(0);
	const [timeout, _setTimeout] = useState(undefined);
	const displayInterval = 10000;

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
	function startLoop(newCount = counter + 1) {
		const T = setTimeout(() => {
			if (counter < display.messages.length - 1) setCounter(newCount);
			else setCounter(0);
		}, displayInterval);
		_setTimeout(T);
	}
	useEffect(() => {
		setMsg(display.messages[counter]);
		console.log(counter);
		startLoop();
	}, [counter]);

	useEffect(() => {
		setMsg(display.messages[0]);
		clearTimeout(timeout);
		setCounter(0);
		startLoop(1);
	}, [display]);

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
