import {useEffect, useState} from 'react'
import {audioKeys} from '../pad_data'
import {connect} from 'react-redux'
import setRecordActionCreator from '../actions/setRecordActionCreator'
import {RECORD, INTERVAL, REC_PLAING_ADD, REC_PLAING_REM} from '../actions/actionTypes'
import recPlaingAction from '../actions/recPlaingAction'
import styleBender from '../utils'
import "../css/DrumPads.css"

function play(key){
    return new Promise(function(resolve, reject) {
        let audio = new Audio();
        audio.src = audioKeys[key];
        audio.autoplay = true;
        audio.onerror = reject;
        audio.onended = resolve;
    });
}


function recDataInit(state){
    let newState = {};
    Object.keys(state).forEach(key => newState[key] = {  
        key: key[3],
        record: [],
        recStart: undefined,
        recActive: false
    });
    return newState;
}

function objectToButtons(object, callback, initClassName){

    return (Object.keys(object).map(key =>    <div 
        id={object[key].name.toUpperCase()}
        className={initClassName}
        key={object[key].name}
        onClick={() => callback(key)}
    >      
        {object[key].name}
    </div>)
    );
}

function resetRecData(state, setState, key) {

    let newState = {...state};
    newState[key].record = [];
    newState[key].recStart = undefined;
 
    setState(newState);
}

function setRecRecord(state, setState, activeRecKey, key){
    let newState = {...state};
    let time = Date.now() - newState[activeRecKey].recStart;
    
    newState[activeRecKey].record.push({
        key,
        time
    })

    setState(newState);
}

////////////////////////////////////////////////////////////////////////////////////
function RecordPads({recMode, setRecord, controlMode, records, recPlaing, setRecPlaing, onGoing, intervals}){
    const classActive = [
        'drum-pad',
        'pad-active',
        'rec-pad'
    ].join(' ');

    const classInactive = [
        'drum-pad',
        'pad-inactive'
    ].join(' ');

    const classDisabled = [
        'drum-pad',
        'disabled-btn'
    ].join(' ');

    const padClasses = {
        active: classActive,
        inactive: classInactive,
        disabled: classDisabled
    }


    const [recData, setRecData] = useState(recDataInit({
        rec1: '',
        rec2: '',
        rec3: ''
    }))

    let [soundInter, setSoundInter] = useState({
        rec1: null,
        rec2: null,
        rec3: null
    })


    const [recKeyStatus, setRecKey] = useState({
        activeRecKey: undefined,
        oldRecKey: undefined
    })

    useEffect(() =>{
        let activeRecKey = Object.keys(recData).filter(key => recMode[key])[0];
        setRecKey({activeRecKey, oldRecKey: recKeyStatus.activeRecKey})
    }, [recMode])

    useEffect(()=>{
        document.addEventListener("keypress", handleKeypress, false);
        return function cleanup() {
            document.removeEventListener("keypress", handleKeypress, false);
        }
    }, [controlMode, recKeyStatus, onGoing, soundInter])

    //Update of redux state
    useEffect(() => {
        Object.keys(recData).forEach(key => {
        
            recMode[key] && setRecord(key, recData[key].record)
        })
        
    },[recData])
    
    // STYLE BENDER

    useEffect(()=>{
        styleBender(
            Object.keys(recMode),
            [padClasses.inactive, padClasses.disabled],
            (key) => !recKeyStatus.activeRecKey && records[key][0],
            (key) => key.toUpperCase());
    }, [recKeyStatus, records])

    function recPlayCallback(i, arr, key, pad){
        setRecPlaing(REC_PLAING_REM, key, i);
        if(i+1===arr.length) {
            pad.classList=padClasses.inactive
        }
    }

    


    function multiPlay(key, pad, isOngoing = false){
        console.log("start")
        console.table({recData, key})
        recData[key].record.forEach((rec, i, arr) => {
            if(!isOngoing) pad.classList = padClasses.active
            let time = rec.time;
            
            setTimeout(() => {
                play(rec.key).then(()=>{
                    isOngoing? 
                    setRecPlaing(REC_PLAING_ADD, key, i)                            
                    :
                    recPlayCallback(i, arr, key, pad)
                })
                !isOngoing && setRecPlaing(REC_PLAING_ADD, key, i)
            }, time);
        })
    }





    function onPlay (interval, key){
        console.log('setting up interval ')
        multiPlay(key, '', true); // to avoid first delay from setInerval
        let interId = setInterval(() => multiPlay(key, '', true), interval);
        let newState = {
            ...soundInter,
            [key]: interId
        }
        setSoundInter(newState);
    }

    function ongoingAudioPlay(key, intervals){
        onPlay(intervals[key], key);
    }


    function clearOngoing(key){
        clearInterval(soundInter[key])
        if(soundInter[key]){
            let newState = {
                ...soundInter,
                [key]: null
            }
            setSoundInter(newState);
        }
    }

    useEffect(() => { 
        Object.keys(soundInter).forEach(key => 
            controlMode === RECORD ? 
            clearOngoing(key)
            :
            !onGoing[key] && clearOngoing(key))
    }, [onGoing, controlMode])


    function handleKeypress({key}){
 
        if(controlMode === INTERVAL) return

        let activeRecKey = recKeyStatus.activeRecKey;

        if(activeRecKey && Object.keys(audioKeys).includes(key)){
            if(activeRecKey !== recKeyStatus.oldRecKey){
                resetRecData(recData, setRecData, activeRecKey);
                recData[activeRecKey].recStart = Date.now();
            }
            setRecKey({activeRecKey, oldRecKey: recKeyStatus.activeRecKey})
            setRecRecord(recData, setRecData, activeRecKey, key);
        }

        if(!activeRecKey && Object.keys(recData).map(rec => recData[rec].key).includes(key)){
            console.log(Object.keys(recData).filter(rec => recData[rec].key === key))
            let recDataKey = `rec${key}`
            let pad = document.getElementById(recDataKey.toUpperCase());
            if(controlMode !== RECORD && onGoing[recDataKey]){
                soundInter[recDataKey] ?
                clearOngoing(recDataKey)
                :
                ongoingAudioPlay(recDataKey, intervals)
            }else{
                multiPlay(recDataKey, pad)
            }
        }

    }

    return(
        <div>
            <div className="drum-pads">
                {Object.keys(recData).map(key =>    
                    <div className="pad-container flex-container">
                        <div className="pad-border">
                            <div
                                id={key.toUpperCase()}
                                className={padClasses.classDisabled}
                                key={key}
                                onClick={() => handleKeypress(recData[key].key)}
                            >
                                {key}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    recMode: state.recMode,
    controlMode: state.controlMode,
    records: state.records,
    onGoing: state.onGoing,
    recPlaing: state.recPlaying,
    intervals: state.intervals
})

const mapDispatchToProps = dispatch => ({
    setRecord: (index, record) => dispatch(setRecordActionCreator(index, record)),
    setRecPlaing: (type, record, index) => dispatch(recPlaingAction(type, record, index))
})                                       

export default connect(mapStateToProps, mapDispatchToProps)(RecordPads);