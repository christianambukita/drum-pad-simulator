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
    <div className="app-container">
      <div className="main-container">
        <div className="top-section">
          <div className="flex-container">
            <ModeControl />
          </div>
        </div>
        <div className="bottom-section">
          <div className="section-container">
            {/* <div id="display">{displayValue}</div> */}
            <DrumPads setDisplay={setDisplay}/>
            <RecordPads />
          </div>
          <div className="section-container">
            <ControlPads />
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default connect(state => ({controlMode: state.controlMode}), null)(App);
