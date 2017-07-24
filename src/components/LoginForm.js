import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
	state = { email: '', password: '', error: '', loading: false };

	onButtonPress() {
		const { email, password } = this.state;

		// clear errors and toggle loader flag
		this.setState({ error: '', loading: true });

		// try to log the user in
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(this.onLoginSuccess.bind(this))
			.catch(() => {
				// try to create the user an account
				firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(this.onLoginSuccess.bind(this))
					.catch(this.onLoginFailure.bind(this));
			});
	}

	onLoginSuccess() {
		// clear all values
		this.setState({ 
			email: '',
			password: '',
			error: '', 
			loading: false 
		});
	}

	onLoginFailure() {	
		this.setState({ 
			error: 'Authentication failed.',
			loading: false
		});
	}

	renderButton() {
		if (this.state.loading) {
			return <Spinner size="small" />
		}

		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				Log in
			</Button>
		);
	}

	render() {
		return (
			<Card>
				<CardSection>
					<Input
						label="Email"
						placeholder="user@gmail.com"
						value={this.state.email}
						onChangeText={email => this.setState({ email })}
					/>
				</CardSection>
				
				<CardSection>
					<Input
						label="Password"
						placeholder="password"
						secureTextEntry
						value={this.state.password}
						onChangeText={password => this.setState({ password })}
					/>
				</CardSection>

				<Text style={styles.errorTextStyle}>
					{this.state.error}
				</Text>

				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		color: 'red',
		alignSelf: 'center'
	}
}
export default LoginForm;
