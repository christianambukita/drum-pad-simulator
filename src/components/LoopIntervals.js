import {audioKeys} from '../pad_data'
import {useEffect} from 'react'
import {connect} from 'react-redux'
import modeActionCreator from '../actions/controlActionCreator'
import {REC_MODE, ONGOING_MODE, INTER_INCREMENT, INTER_DECREMENT} from '../actions/actionTypes'
import "../css/DrumPads.css"
import "../css/LoopIntervals.css"
import  interActionCreator from '../actions/interActionCreator'

const mapStateToProps = (state) => ({
    onGoingPads: state.onGoing,
    intervals: state.intervals,
    recMode: state.recMode,
})

const mapDispatchToProps = (dispatch) => {
    return {
      changeRecMode: (key) => {
        dispatch(modeActionCreator(key, REC_MODE))
      },
      changeOngoingMode: (key) => {
          dispatch(modeActionCreator(key, ONGOING_MODE))
      },
      incrementInterval: (key) => {
          dispatch(modeActionCreator(key, INTER_INCREMENT))
      },
      decrementInterval: (key) => {
          dispatch(modeActionCreator(key, INTER_DECREMENT))
      },
    }
  }

function objectToControlButtons(object, callback, initClassName){

    return (Object.keys(object).map(key =>    <div 
        id={object[key].name.toUpperCase()+'-C'}
        className={initClassName}
        key={object[key].name}
        onClick={() => callback(key)}
    >      
        {object[key].name}
    </div>)
    )
}



function LoopIntervals({changeOngoingMode, incrementInterval, decrementInterval, recMode, onGoingPads, intervals, }){

    let audioPads = {...audioKeys};
    Object.keys(audioKeys).forEach(key => audioPads[key] = {name: key});

    const onGoingControls = Object.keys(onGoingPads).map((key, i) => 
    <li
        id={key+'-IC'}
        key={key+'inter-input'}
        className="inter-container"
    >
        <div className="space-between">
            <div className='inter-button'>{key.toUpperCase()}</div>
            <div className="inter-display">{intervals[key]}</div>
            <div className="inter-control-container">
                <button onClick={() => decrementInterval(key)}>{'<'}</button>
                <button onClick={() => incrementInterval(key)}>{'>'}</button>
            </div>
        </div>
        
    </li>)

    return(
        <div className="loop-container">
            <div className='interval-container'>
                <ul id="interval-list">
                {onGoingControls}
                </ul>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoopIntervals);