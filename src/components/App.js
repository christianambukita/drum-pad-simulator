import {useState} from 'react'
import {connect} from 'react-redux'
import '../App.css';
import DrumPads from './DrumPads'
import RecordPads from './RecordPads'
import ModeControl from './ModeControl';
import IntervalControl from './IntervalControl'
import OngoingPads from './OngoingPads'
import RecBoard from './RecBoard'

function App() {

  
  const [displayValue, setDisplay] = useState('Press any key');

  return (
    <div className="app-container">
      <div className="main-container">
        <div className="top-section">
        </div>
        <div className="bottom-section">
          <div className="section-container">
            <RecBoard />
          </div>
          <div className="section-container">
            {/* <div id="display">{displayValue}</div> */}
            <DrumPads setDisplay={setDisplay}/>
            <RecordPads />
          </div>
          <div className="section-container">
            <IntervalControl />
          </div>
          <div className="section-container">
            <OngoingPads />
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default connect(state => ({controlMode: state.controlMode}), null)(App);
