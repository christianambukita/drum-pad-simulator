import React from "react"
import "../css/MainDisplay.css"
import "../css/v-display.css"

export default function MainDisplay() {
    const DisplayMessages = {}
    return( 
        <div className="main-display-container flex-container">
            <div className="v-display-border main-display-border">
                <div className="v-display-shadow main-display">
                    
                </div>
            </div>
        </div>
    )
}