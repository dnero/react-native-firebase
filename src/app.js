import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';

class App extends Component {
	componentWillMount() {
		// Initialize Firebase
		firebase.initializeApp({
			apiKey: "AIzaSyCtVMV7ATvnArRtCIut3xvwCAZUenlxszw",
			authDomain: "react-native-auth-b6c36.firebaseapp.com",
			databaseURL: "https://react-native-auth-b6c36.firebaseio.com",
			projectId: "react-native-auth-b6c36",
			storageBucket: "react-native-auth-b6c36.appspot.com",
			messagingSenderId: "898029056210"
		});
	}

	render() {
		return (
			<View>
				<Header headerText="Authentication"></Header>
				<Text>An App!</Text>
			</View>
		);
	}
}

export default App;