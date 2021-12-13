import {useState} from 'react'
import {connect} from 'react-redux'
import '../App.css';
import DrumPads from './DrumPads'
import RecordPads from './RecordPads'
import RecBoard from './RecBoard'
import LoopIntervals from './LoopIntervals';

function App() {

  
  const [displayValue, setDisplay] = useState('Press any key');

  return (
    <div className="app-container">
      <div className="main-container">
        <div className="top-section">
        </div>
        <div className="bottom-section">
          <div className="section-container">
            <LoopIntervals />
          </div>
          <div className="section-container">
            <DrumPads setDisplay={setDisplay}/>
            <RecordPads />
          </div>
          
          <div className="section-container">
            <RecBoard />
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default connect(state => ({controlMode: state.controlMode}), null)(App);
