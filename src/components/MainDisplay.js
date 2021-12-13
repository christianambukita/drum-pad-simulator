import React, { useState, useEffect } from "react"
import "../css/MainDisplay.css"
import "../css/v-display.css"
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    recMode: state.recMode,
})

const DISPLAY_MSGS = {
    rec: (key)=> ({
        header: "MODE: RECCORD",
        message: `Use keys to reccord melody. Press ${key.toUpperCase()} to stop reccording.`,
    }),
    play: {
        header: "MODE: PLAY",
        message: "To loop sound activate specific key on left panel and set time interval",
    },
}

function MainDisplay({recMode}) {



    const [display, setDisplay] = useState(DISPLAY_MSGS.play)
    useEffect(()=>{
        let recActive = false;
        Object.keys(recMode)
            .forEach(key => {if(recMode[key]) recActive=key})
        if(recActive){
            setDisplay(DISPLAY_MSGS.rec(recActive))
        }
        else{
            setDisplay(DISPLAY_MSGS.play)
        }
    
        },[recMode])

    return( 
        <div className="main-display-container flex-container">
            <div className="v-display-border main-display-border">
                <div className="v-display-shadow main-display">
                    <p className="main-display-header">{display.header}</p>
                    <p className="main-display-message">{display.message}</p>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(MainDisplay);