import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { recModeReducer, onGoingModeReducer } from './reducers/controlReducer';
import controlModeReducer from './reducers/controlModeReducer';
import intervalReducer from './reducers/intervalReducer';
import recordReducer from './reducers/recordReducer';
import recPlayingReducer from './reducers/recPlaingReducer';

const composeEnhancers = composeWithDevTools({ trace: true });

const rootReducer = combineReducers({
	recMode: recModeReducer,
	onGoing: onGoingModeReducer,
	controlMode: controlModeReducer,
	intervals: intervalReducer,
	records: recordReducer,
	recPlaying: recPlayingReducer,
});

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

export { store };
