import {useState} from 'react'
import {connect} from 'react-redux'
import '../App.css';
import DrumPads from './DrumPads'
import RecordPads from './RecordPads'
import ControlPads from './ControlPads'
import ModeControl from './ModeControl';

function App() {

  
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
