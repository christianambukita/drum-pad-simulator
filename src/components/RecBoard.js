import {connect} from 'react-redux'
import {useEffect} from 'react'
import modeActionCreator from '../actions/controlActionCreator'
import {REC_MODE, ONGOING_MODE_RESET} from '../actions/actionTypes'
import styleBender from '../utils'
import '../css/RecBoard.css'
import '../css/v-display.css'


const styleClasses = {
    active: 'rec-btn rec-btn-active flex-container',
    inactive: 'rec-btn flex-container'
}


function RecBoard({records, recMode, changeRecMode, recPlaying, resetOngoing}) {


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

    console.table(records);
    return(
        <div className='rec-board-container'>
            <div id='rec-board'>
                {
                    Object.keys(records).map(key => 
                        <div className="rec-column-container" key={`${key}-list`}>
                            <div className="v-display-border" >
                                <div className='list-container v-display-shadow' >
                                    <p className="record-list-name" >{key.toUpperCase().replace(/(\d)/, "  $1")}</p>
                                    <div className="space-between list-description">
                                        <div>
                                            <p>key</p>
                                        </div>
                                        <div>
                                            <p>time[ms]</p>
                                        </div>
                                    </div>
                                    <ul className='record-list'>
                                        {records[key].map((element, i) =>
                                            <li
                                                id={key+'-'+i}
                                                key={i}
                                                className={i%2?"list-item-2":"list-item-1"}
                                            >
                                                <div className="space-between">
                                                    <div>{(element.key).toUpperCase()}</div>
                                                    <div>{element.time}</div>
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                
                            </div>
                            
                            <div className="rec-btn-container flex-container">
                                <div
                                    id={key.toUpperCase()+'-R'}
                                    className=''
                                    onClick={() => {changeRecMode(key); resetOngoing();}}
                                >
                                    <div className="rec-btn-diode"></div>
                                    <p className="rec-btn-label">{key.toUpperCase()}</p>
                                </div>
                            </div>

                        </div>
                    )
                }
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
    },
    resetOngoing: () => {
        dispatch(modeActionCreator(undefined, ONGOING_MODE_RESET))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RecBoard)