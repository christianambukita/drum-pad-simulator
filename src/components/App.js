import {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import fccTest from '../fCC_test'
import '../App.css';
import DrumPads from './DrumPads'
import RecordPads from './RecordPads'
import ControlPads from './ControlPads'
import RecBoard from './RecBoard'
import ModeControl from './ModeControl';

function App({controlMode}) {
  //Test from fCC project
  useEffect(fccTest, []);
  
  const [displayValue, setDisplay] = useState('Press any key');

  return (
    <div className="App">
      <div id="drum-machine">
        <div>
          {/* <div id="display">{displayValue}</div> */}
          <DrumPads setDisplay={setDisplay}/>
          <RecordPads />
        </div>
        <div>
          <ModeControl />
          <ControlPads />
        </div>
        
      </div>
    </div>
  );
}

export default connect(state => ({controlMode: state.controlMode}), null)(App);
