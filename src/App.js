import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';
import FaceRecognition from './components/FaceRecognition';
import SignIn from './components/SignIn';
import Register from './components/Register';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'home',
			isSignedIn: false,
			user: {
				id: '',
				name: '',
				email: 'Guest',
				faceEntries: 0,
				joined: '',
			},
		};
	}

	loadUser = (data) => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				faceEntries: data.faceEntries,
				joined: data.joined,
			},
		});
	};

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input });
		const raw = JSON.stringify({
			user_app_id: {
				user_id: 'xov94uh6iogg',
				app_id: 'a4fd1a32288f443796cf62069020f2bf',
			},
			inputs: [
				{
					data: {
						image: {
							url: this.state.input,
						},
					},
				},
			],
		});

		const requestOptions = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: 'Key 367f84469eea469c9c7eeb84d3337746',
			},
			body: raw,
		};

		fetch(
			`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
			requestOptions
		)
			.then((response) => response.text())
			.then((result) => this.displayFaceBox(this.calculateFaceLocation(result)))
			.catch((error) => console.log('error', error));
	};

	calculateFaceLocation = (data) => {
		const faces = JSON.parse(data, null, 2).outputs[0].data.regions;
		let faceLocations = [];

		faces.forEach((face) => {
			const clarifaiFace = face.region_info.bounding_box;
			const image = document.querySelector('#input-image');
			const width = Number(image.width);
			const height = Number(image.height);

			faceLocations.push({
				leftCol: clarifaiFace.left_col * width,
				topRow: clarifaiFace.top_row * height,
				rightCol: width - clarifaiFace.right_col * width,
				bottomRow: height - clarifaiFace.bottom_row * height,
			});

			fetch('http://localhost:4000/image', {
				method: 'put',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id: this.state.user.id,
				}),
			})
				.then((response) => response.json())
				.then((count) => {
					this.setState(Object.assign(this.state.user, { faceEntries: count }));
				});
		});

		return faceLocations;
	};

	displayFaceBox = (box) => {
		this.setState({ box: box });
	};

	onRouteChange = (request) => {
		this.setState({ route: request });
	};

	render() {
		const { imageUrl, box, route } = this.state;

		return (
			<div className="body-container bg-purple-dark text-pwhite">
				{/* <Navigation /> */}
				<p className="pt-24 text-5xl max-w-sm">AI Face Trainer</p>
				<p className="text-pred text-xl mt-4 max-w-sm">
					Input links to images to train Clarifai's facial recognition AI that is being
					interacted with through its API. The more faces you detect the higher your score
					gets! <br></br>
					<br></br>You can interact with the Face Trainer without signing in.
				</p>

				{/* {route === 'home' ? ( */}
				<div>
					{/* <Rank
						email={this.state.user.email}
						faceEntries={this.state.user.faceEntries}
						onRouteChange={this.onRouteChange}
					/> */}
					<ImageLinkForm
						onInputChange={this.onInputChange}
						onSubmit={this.onButtonSubmit}
					/>
					<FaceRecognition box={box} imageUrl={imageUrl} />
				</div>
				{/* // ) : route === 'register' ? (
				// 	<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
				// ) : (
				// 	<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
				// )} */}
			</div>
		);
	}
}

export default App;
