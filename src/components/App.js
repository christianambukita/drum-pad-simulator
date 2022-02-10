import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import DrumPads from './DrumPads';
import RecordPads from './RecordPads';
import RecBoard from './RecBoard';
import LoopIntervals from './LoopIntervals';
import MainDisplay from './MainDisplay';
import arrow from '../img/rotate-arrow.svg';

function App() {
	const [windowWide, setWindowWide] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setWindowWide(window.innerWidth > window.innerHeight);
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className='app-container'>
			<div className='outer-border flex-container'>
				<div className='inner-border flex-container'>
					<div className='main-container'>
						<div className='top-section'>
							<MainDisplay />
						</div>
						<div className='bottom-section'>
							<div id='interval-section' className='section-container'>
								<LoopIntervals />
							</div>
							<div id='drum-section' className='section-container'>
								<DrumPads />
								<RecordPads />
							</div>

							<div id='rec-section' className='section-container'>
								<RecBoard />
							</div>
						</div>
					</div>
				</div>
			</div>
			{!windowWide && (
				<div className='flip-message'>
					<p>Flip your screen </p>
					<img src={arrow} alt='rotate-arrow' />
				</div>
			)}
		</div>
	);
}

export default connect(
	(state) => ({ controlMode: state.controlMode }),
	null
)(App);
