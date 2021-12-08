import {connect} from 'react-redux'
import  interActionCreator from '../actions/interActionCreator'

const mapStateToProps = (state) => ({
    onGoingPads: state.onGoing,
    intervals: state.intervals
})

const mapDispatchToProps = (dispatch) => ({
    changeInterValue: (key, inter) => dispatch(interActionCreator(key, inter))
})


function IntervalControl({onGoingPads, intervals, changeInterValue}) {
    const onGoingControls = Object.keys(onGoingPads).map((key, i) => 
    <li
        id={key+'-IC'}
        key={key+'inter-input'}
        className={i%2?"list-item-1":"list-item-2"}
    >
        <div className="space-between">
            <label>{key.toUpperCase()}</label>
            <input 
                type="number"
                min="100"
                max="10000"
                
                value={intervals[key]}
                onChange={(e) => changeInterValue(key, e.target.value)}
            />
        </div>
        
    </li>)
    return(
        <div>
            <div className="space-between list-description">
                <p>key:</p>
                <p>interval [ms]</p>
            </div>
            <ul id="interval-list">
            {onGoingControls}
            </ul>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(IntervalControl);