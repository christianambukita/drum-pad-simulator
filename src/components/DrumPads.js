import {audioKeys} from '../pad_data';
import {useEffect, useState} from 'react'
import { nanoid } from 'nanoid'
import {connect} from 'react-redux'
import {RECORD} from '../actions/actionTypes'
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



function DrumPads({setDisplay, onGoingMode, intervals, controlMode}) {
    const classActive = [
        'pad-active'
    ].join(' ');



    //used to check weather to visualy disactivate pad
    let soundsId = {
        q: {id: '', timeout: null},
        w: {id: '', timeout: null},
        e: {id: '', timeout: null},
        a: {id: '', timeout: null},
        s: {id: '', timeout: null},
        d: {id: '', timeout: null},
        z: {id: '', timeout: null},
        x: {id: '', timeout: null},
        c: {id: '', timeout: null}
    }

    let [soundInter, setSoundInter] = useState({
    q: null,
    w: null,
    e: null,
    a: null,
    s: null,
    d: null,
    z: null,
    x: null,
    c: null
    })

    function singleAudioPlay(key){
        let pad = document.getElementById(key.toLocaleUpperCase());
        pad.classList.add("pad-active")
        pad.classList.add("pad-playing")

        setTimeout(() => pad.classList.remove("pad-active"), 150)
        setDisplay(key);

        let soundId = nanoid();
        soundsId[key].id = soundId;
        play(key)
            .then( () => {
                if(soundsId[key].id === soundId)
                    pad.classList.remove("pad-playing");
            })
    }

    function onPlay (interval, key){
        let pad = document.getElementById(key.toLocaleUpperCase());
        pad.classList.add("pad-active")
        pad.classList.add("pad-playing")

        setTimeout(() => pad.classList.remove("pad-active"), 150)

        let interId = setInterval(() => play(key), interval);
        let newState = {
            ...soundInter,
            [key]: interId
        }
        setSoundInter(newState);

        console.log("let :" + newState[key])
        console.log("state :" + soundInter)
    }

    function ongoingAudioPlay(key, intervals){
        onPlay(intervals[key], key);
    }


    function clearOngoing(key, keyAnimation = false){
        let pad = document.getElementById(key.toLocaleUpperCase());
        pad.classList.remove("pad-playing");

        if (keyAnimation){pad.classList.add("pad-active");
        setTimeout(() => pad.classList.remove("pad-active"), 150)}

        clearInterval(soundInter[key])
        if(soundInter[key]){
            let newState = {
                ...soundInter,
                [key]: null
            }
            setSoundInter(newState);
        }
    }

    //Czy to tworzy elementy audio w nieskończoność?
    function handleKeypress(key){
        if(Object.keys(audioKeys).includes(key)){
            if(controlMode === RECORD){
                singleAudioPlay(key)
            }else {
                !onGoingMode[key]?
                singleAudioPlay(key)
                :
                !soundInter[key]?
                ongoingAudioPlay(key, intervals)
                :
                clearOngoing(key, true)
            }

        }
    }

    const handleKeyPressCallback = (e) => handleKeypress(e.key);

    useEffect(() => { 
        Object.keys(soundInter).forEach(key => 
            controlMode === RECORD ? 
            clearOngoing(key)
            :
            !onGoingMode[key] && clearOngoing(key))
    }, [onGoingMode, controlMode])

    useEffect(()=>{
        document.addEventListener("keypress", handleKeyPressCallback, false);
        return function cleanup() {
            document.removeEventListener("keypress", handleKeyPressCallback, false);
        }
    }, [onGoingMode, soundInter, intervals, controlMode])
    
    const pads = Object.keys(audioKeys).map(key => 
        <div className="pad-container flex-container" key={key}>
            <div className="pad-border" id={key.toLocaleUpperCase()}>
                <div
                    className="drum-pad flex-container"
                    onClick={() => handleKeypress(key)}
                >
                    {key.toUpperCase()}
                </div>
            </div>
        </div>
    );

    return (
        <div className="drum-pads">
            {pads}
        </div>
    )
}

const mapStateToProps = state => ({
    onGoingMode: state.onGoing,
    intervals: state.intervals,
    controlMode: state.controlMode
})

export default connect( mapStateToProps ,null)(DrumPads);