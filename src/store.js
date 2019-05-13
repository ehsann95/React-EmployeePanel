import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyATtP-RBfoLS0HVX4hBwdX1kuD3gV2XIT8',
	authDomain: 'reactemployee-38ab5.firebaseapp.com',
	databaseURL: 'https://reactemployee-38ab5.firebaseio.com',
	projectId: 'reactemployee-38ab5',
	storageBucket: 'reactemployee-38ab5.appspot.com',
	messagingSenderId: '114861646871',
	appId: '1:114861646871:web:bb1469d088dfda68',
};

const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true,
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const createStoreWithFirebase = compose(
	reactReduxFirebase(firebase, rrfConfig),
	reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
});

const initialState = {};

const store = createStoreWithFirebase(
	rootReducer,
	initialState,
	compose(
		reactReduxFirebase(firebase),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
