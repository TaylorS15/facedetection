import React, {Component} from 'react'
import Navigation from './components/navigation/Navigation'
import ImageLinkForm from './components/ImageLinkForm'
import Rank from './components/Rank'
import FaceRecognition from './components/FaceRecognition'
import SignIn from './components/SignIn'
import Register from './components/Register'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'home'
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": 'xov94uh6iogg',
          "app_id": 'portfolio-app'
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": this.state.input
                  }
              }
          }
      ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key 367f84469eea469c9c7eeb84d3337746'
        },
        body: raw
    };

    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
      .then(response => response.text())
      .then(result =>  this.displayFaceBox(this.calculateFaceLocation(result)))
      .catch(error => console.log('error', error));
  }

  calculateFaceLocation = (data) => {
    const faces = JSON.parse(data, null, 2).outputs[0].data.regions
    const faceLocations = []

    faces.forEach(face => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.querySelector('#input-image');
      const width = Number(image.width);
      const height = Number(image.height);

      faceLocations.push({
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height),
      })
    })

    return faceLocations
  } 

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onRouteChange = (request) => {
    this.setState({route: request})
  }

  render() {
    const {input, imageUrl, box, route} = this.state;

    return (
      <div className='body-container bg-purple-dark text-pwhite'>
        <Navigation />
        <p className='pt-24 text-5xl max-w-sm'>AI Face Trainer</p>
        <p className='text-pred text-xl mt-4 max-w-sm'>Input links to images to train Clarifai's 
        facial recognition AI that is being interacted with through its API. The more 
        faces you detect the higher your score gets! {/*<br></br><br></br>This app does not save any of 
        the images uploaded or any data from users other than the amount of links submitted. */}</p>

        {
          route === 'home' ? 
          <div>
            <Rank routeChange={this.onRouteChange}/>
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>        
          </div> : (route === 'register' ? <Register routeChange={this.onRouteChange}/> :
            <SignIn routeChange={this.onRouteChange}/>
          )   
        }
      </div>
    );
  }
}

export default App;