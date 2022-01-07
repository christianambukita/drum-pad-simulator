//modeControl

// useEffect(()=>{
//     styleBender(modes);

// }, [controlMode])

// function styleBender(state) {
//     state.forEach(key => {
//         let pad = document.getElementById(key);

//         pad.classList = controlMode == key ?
//         styleClasses.active
//         :
//         styleClasses.inactive
//     })
// }

// //recBoard

// useEffect(()=>{
//     styleBender(Object.keys(recMode));
// }, [recMode])

// function styleBender(state) {
//     state.forEach(key => {
//         let pad = document.getElementById(key.toUpperCase()+'-R');

//         pad.classList = recMode[key] ?
//         styleClasses.active
//         :
//         styleClasses.inactive
//     })
// }

// //recordPads

// useEffect(()=>{
//     styleBender(Object.keys(recMode).map(key => key.toUpperCase()));
// }, [recKeyStatus, records])

// function styleBender(state) {
//     state.forEach(key => {
//         let pad = document.getElementById(key);
//         pad.classList = !recKeyStatus.activeRecKey && records[key.toLowerCase()][0]?
//         padClasses.inactive
//         :
//         padClasses.disabled
//     })
// }

// //ongoingPads

// function styleBender(state) {
//     Object.keys(state).forEach(key => {
//         let pad = document.getElementById(key.toLocaleUpperCase()+'-C');

//         pad.classList = state[key] ?
//         styleClasses.active
//         :
//         styleClasses.inactive
//     })
// }

// useEffect(()=>{
//     styleBender(onGoingMode);
// }, [recMode, onGoingMode])

//universal function

function styleBender(
	elementNameList,
	styles,
	changeConditionFunction,
	toIdConverter = (key) => key
) {
	elementNameList.forEach((key) => {
		let docElem = document.getElementById(toIdConverter(key));
		docElem.classList = changeConditionFunction(key) ? styles[0] : styles[1];
	});
}

export default styleBender;
