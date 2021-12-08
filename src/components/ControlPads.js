import {conncat, connect} from 'react-redux'
import IntervalControl from './IntervalControl'
import OngoingPads from './OngoingPads'
import RecBoard from './RecBoard'
import {RECORD, PLAY, INTERVAL} from '../actions/actionTypes'
import controlModeReducer from '../reducers/controlModeReducer'

function ComponentPicker(mode){
    switch(mode){
        case PLAY:
            return <OngoingPads />
        case RECORD:
            return <RecBoard />
        case INTERVAL:
            return <IntervalControl />
        default:
            return <OngoingPads />
    }
}

function ControlPads({controlMode}){
   

    return(
        <div>
            {ComponentPicker(controlMode)}
        </div>
    )

}

export default connect(state => ({controlMode: state.controlMode}), null)(ControlPads)