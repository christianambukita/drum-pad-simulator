import { useEffect, useState } from 'react';
import { audioKeys } from '../pad_data';
import { connect } from 'react-redux';
import setRecordActionCreator from '../actions/setRecordActionCreator';
import {
	RECORD,
	INTERVAL,
	REC_PLAING_ADD,
	REC_PLAING_REM,
} from '../actions/actionTypes';
import recPlaingAction from '../actions/recPlaingAction';
import '../css/DrumPads.css';

function play(key) {
	return new Promise(function (resolve, reject) {
		let audio = new Audio();
		audio.src = audioKeys[key];
		audio.autoplay = true;
		audio.onerror = reject;
		audio.onended = resolve;
	});
}

function recDataInit(state) {
	let newState = {};
	Object.keys(state).forEach(
		(key) =>
			(newState[key] = {
				key: key[3],
				record: [],
				recStart: undefined,
				recActive: false,
			})
	);
	return newState;
}

function resetRecData(state, setState, key) {
	let newState = { ...state };
	newState[key].record = [];
	newState[key].recStart = undefined;

	setState(newState);
}

function setRecRecord(state, setState, activeRecKey, key) {
	let newState = { ...state };
	let time = Date.now() - newState[activeRecKey].recStart;

	newState[activeRecKey].record.push({
		key,
		time,
	});

	setState(newState);
}

////////////////////////////////////////////////////////////////////////////////////
function RecordPads({
	recMode,
	setRecord,
	controlMode,
	records,
	recPlaing,
	setRecPlaing,
	onGoing,
	intervals,
}) {
	const classActive = ['pad-active'].join(' ');

	const classInactive = ['pad-inactive'].join(' ');
	const classDisabled = ['pad-disabled'].join('');

	const padClasses = {
		active: classActive,
		inactive: classInactive,
		disabled: classDisabled,
	};

	const [recData, setRecData] = useState(
		recDataInit({
			rec1: '',
			rec2: '',
			rec3: '',
		})
	);

	let [soundInter, setSoundInter] = useState({
		rec1: null,
		rec2: null,
		rec3: null,
	});

	const [recKeyStatus, setRecKey] = useState({
		activeRecKey: undefined,
		oldRecKey: undefined,
	});

	useEffect(() => {
		let activeRecKey = Object.keys(recMode).filter((key) => recMode[key])[0];
		setRecKey({ activeRecKey, oldRecKey: recKeyStatus.activeRecKey });
	}, [recMode]);

	useEffect(() => {
		document.addEventListener('keypress', handleKeypress, false);
		return function cleanup() {
			document.removeEventListener('keypress', handleKeypress, false);
		};
	}, [controlMode, recKeyStatus, onGoing, soundInter]);

	//Update of redux state
	useEffect(() => {
		Object.keys(recData).forEach((key) => {
			recMode[key] && setRecord(key, recData[key].record);
		});
	}, [recData]);

	// STYLE BENDER

	useEffect(() => {
		const styles = [padClasses.inactive, padClasses.disabled];
		const changeConditionFunction = (key) => records[key][0];
		const toIdConverter = (key) => key.toUpperCase();
		Object.keys(recMode).forEach((key) => {
			let docElem = document.getElementById(toIdConverter(key));
			if (docElem) {
				if (changeConditionFunction(key)) {
					docElem.classList.add(styles[0]);
					docElem.classList.remove(styles[1]);
				} else {
					docElem.classList.remove(styles[0]);
					docElem.classList.add(styles[1]);
				}
			}
		});
	}, [recKeyStatus, records]);

	function recPlayCallback(i, arr, key, pad) {
		setRecPlaing(REC_PLAING_REM, key, i);
		if (!onGoing[key]) {
			if (i + 1 === arr.length) {
				pad.classList.remove('pad-playing');
			}
		}
	}

	function multiPlay(key, pad, isOngoing = false) {
		if (!isOngoing) {
			pad.classList.add('pad-active');
			setTimeout(() => pad.classList.remove('pad-active'), 150);
		}

		pad.classList.add('pad-playing');
		records[key].forEach((rec, i, arr) => {
			let time = rec.time;

			setTimeout(() => {
				document.getElementById(`${key}-${i}`).scrollIntoView(false);
				setRecPlaing(REC_PLAING_ADD, key, i);
				play(rec.key).then(() => {
					recPlayCallback(i, arr, key, pad);
				});
			}, time);
		});
	}

	function ongoingPlay(interval, key, pad) {
		multiPlay(key, pad, false); // to avoid first delay from setInerval
		let interId = setInterval(() => multiPlay(key, pad, true), interval);
		let newState = {
			...soundInter,
			[key]: interId,
		};
		setSoundInter(newState);
	}

	function ongoingPlayWrap(key, intervals, pad) {
		const recDuration = records[key].at(-1).time; //time of last recorded sound in recording
		const combinedInterval = intervals[key] + recDuration;
		ongoingPlay(combinedInterval, key, pad);
	}

	function clearOngoing(key, keyAnimation = false) {
		let pad = document.getElementById(key.toLocaleUpperCase());
		pad.classList.remove('pad-playing');

		if (keyAnimation) {
			pad.classList.add('pad-active');
			setTimeout(() => pad.classList.remove('pad-active'), 150);
		}
		clearInterval(soundInter[key]);
		if (soundInter[key]) {
			let newState = {
				...soundInter,
				[key]: null,
			};
			setSoundInter(newState);
		}
	}

	//clear all queued intervals of keys that arent ongoing any more
	useEffect(() => {
		Object.keys(soundInter).forEach(
			(key) => !onGoing[key] && clearOngoing(key)
		);
	}, [onGoing]);

	function handleKeypress({ key }) {
		let activeRecKey = recKeyStatus.activeRecKey;
		const recEnabled = records[`rec${key}`]
			? records[`rec${key}`].length !== 0
			: false;
		if (!activeRecKey && recEnabled) {
			let recDataKey = `rec${key}`;
			let pad = document.getElementById(recDataKey.toUpperCase());
			if (onGoing[recDataKey]) {
				soundInter[recDataKey]
					? clearOngoing(recDataKey, true)
					: ongoingPlayWrap(recDataKey, intervals, pad);
			} else {
				multiPlay(recDataKey, pad);
			}
		}
	}

	const getKey = (key) => key.replace(/rec(\d)/, '$1');

	return (
		<div>
			<div className='drum-pads'>
				{Object.keys(recData).map((key) => (
					<div className='pad-container flex-container' key={key}>
						<div className='pad-border' id={key.toLocaleUpperCase()}>
							<div
								className='drum-pad flex-container'
								onClick={() => handleKeypress({ key: getKey(key) })}>
								{key.replace(/rec(\d)/, 'R$1')}
								<div className='pad-diode'></div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	recMode: state.recMode,
	controlMode: state.controlMode,
	records: state.records,
	onGoing: state.onGoing,
	recPlaing: state.recPlaying,
	intervals: state.intervals,
});

const mapDispatchToProps = (dispatch) => ({
	setRecord: (index, record) => dispatch(setRecordActionCreator(index, record)),
	setRecPlaing: (type, record, index) =>
		dispatch(recPlaingAction(type, record, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordPads);
