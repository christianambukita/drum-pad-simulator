import {connect} from 'react-redux'
import {useEffect} from 'react'
import modeActionCreator from '../actions/controlActionCreator'
import {REC_MODE} from '../actions/actionTypes'
import styleBender from '../utils'
import '../css/RecBoard.css'

function objectToControlButtons(object, callback, initClassName){

    return (Object.keys(object).map(key =>    <div 
        id={key.toUpperCase()+'-R'}
        className={initClassName}
        key={key}
        onClick={() => callback(key)}
    >      
        {key.toUpperCase()}
    </div>)
    )
}

const styleClasses = {
    active: 'rec-btn rec-btn-active',
    inactive: 'rec-btn'
}


function RecBoard({records, recMode, changeRecMode, recPlaying}) {
    let recordLists = Object.keys(records).map(index => 
        <div className='list-container'>
            <h4 className="record-list-name">{index.toUpperCase()}</h4>
            <div className="space-between list-description">
                <div>
                    <p>key</p>
                </div>
                <div>
                    <p>time[ms]</p>
                </div>
            </div>
            <ul className='record-list'>
                {records[index].map((element, i) => 
                    <li 
                        id={index+'-'+i}
                        key={i}
                        className={i%2?"list-item-2":"list-item-1"}
                    >
                        <div className="space-between">
                            <div>{element.key}</div>
                            <div>{element.time}</div>
                        </div>
                    </li>
                )}
        </ul>
        </div>
    )


    useEffect(()=>{
        Object.keys(records).forEach(key => {

            records[key].forEach((x,index) => {
            let pad = document.getElementById(key+'-'+index)
            
            pad.classList = recPlaying[key].includes(index) ?
            'list-item-playing'
            :
            index%2?"list-item-2":"list-item-1"
            }
                
            )
            
        })
    }, [recPlaying])

    useEffect(()=>{
        styleBender(
            Object.keys(recMode),
            [styleClasses.active, styleClasses.inactive],
            (key) => recMode[key],
            (key) => key.toUpperCase()+'-R');
    }, [recMode])


    return(
        <div className='rec-board-container'>
            <div id='rec-board'>
                {recordLists.map((record, index) => <div key={index}>{record}</div>)}
            </div>
            <div className="drum-pads">
                {objectToControlButtons(records, changeRecMode, 'rec-btn')}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    records: state.records,
    recMode: state.recMode,
    recPlaying: state.recPlaying
 })

const mapDispatchToProps = dispatch => ({
    changeRecMode: (key) => {
        dispatch(modeActionCreator(key, REC_MODE))
      }
})

export default connect(mapStateToProps, mapDispatchToProps)(RecBoard)