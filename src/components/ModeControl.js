import { connect } from 'react-redux'
import {PLAY, RECORD, INTERVAL} from '../actions/actionTypes'
import {useEffect} from 'react'
import styleBender from '../utils'

const mapDispatchToProps = (dispatch) => ({
    changeControlMode: (type) => dispatch({type})
})

const modes = [
    PLAY,
    RECORD,
    INTERVAL
]

function arrToList(arr, callback, styles){
    return arr.map(item => 
    <li
        key={item}
        id={item}
        onClick={() => callback(item)}
        className={styles}
    >
        {item}
    </li>)
}
function ModeControl({changeControlMode, controlMode}) {

    
    const styleClasses = {
        active: 'control-pad-active',
        inactive: 'control-pad-inactive'
    }

    useEffect(()=>{
        styleBender(
            modes, 
            [styleClasses.active, styleClasses.inactive],
            (key) => controlMode == key
        );
        
    }, [controlMode])

    return(
        <div>
            <ul className="mode-control">
                {arrToList(modes, changeControlMode, "")}
            </ul>
        </div>
    )
}

export default connect(state => ({controlMode: state.controlMode}), mapDispatchToProps)(ModeControl)