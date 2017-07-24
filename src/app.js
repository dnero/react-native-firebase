import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
	state = { loggedIn: null };

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

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true:
				return (
					<Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
				);
			break;
			
			case false:
				return <LoginForm />
			break;

			default: 
			return <Spinner size="large" />
		}
	}

	render() {
		return (
			<View>
				<Header headerText="Authentication"></Header>
				{this.renderContent()}
			</View>
		);
	}
}

export default App;