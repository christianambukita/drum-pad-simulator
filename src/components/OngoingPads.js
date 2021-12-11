import {audioKeys} from '../pad_data'
import {useEffect} from 'react'
import {connect} from 'react-redux'
import modeActionCreator from '../actions/controlActionCreator'
import {REC_MODE, ONGOING_MODE} from '../actions/actionTypes'
import styleBender from '../utils'
import "../css/DrumPads.css"






const mapStateToProps = (state) => ({
    recMode: state.recMode,
    onGoingMode: state.onGoing
})

const mapDispatchToProps = (dispatch) => {
    return {
      changeRecMode: (key) => {
        dispatch(modeActionCreator(key, REC_MODE))
      },
      changeOngoingMode: (key) => {
          dispatch(modeActionCreator(key, ONGOING_MODE))
      }
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



function OngoingPads({changeOngoingMode, recMode, onGoingMode}){


    const styleClasses = {
        active: 'control-pad-active',
        inactive: 'control-pad-inactive'
    }

    
    const recPads = {    
        rec1: {name: 'rec1'},
        rec2: {name: 'rec2'},
        rec3: {name: 'rec3'}
    };

    let audioPads = {...audioKeys};
    Object.keys(audioKeys).forEach(key => audioPads[key] = {name: key});
    
    useEffect(()=>{
        styleBender(
            Object.keys(onGoingMode),
            [styleClasses.active, styleClasses.inactive],
            (key) => onGoingMode[key],
            (key) => key.toLocaleUpperCase()+'-C'
            );
    }, [recMode, onGoingMode])


    return(
        <div id="control-container">
            <div className="drum-pads drum-pad-hover">
                {objectToControlButtons(audioPads, changeOngoingMode, styleClasses.inactive)}
            </div>
            <div>
                <div></div>
                <div className="drum-pads drum-pad-hover">
                    {objectToControlButtons(recPads, changeOngoingMode, styleClasses.inactive)}
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(OngoingPads);