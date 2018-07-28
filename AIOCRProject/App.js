// import React, { Component } from 'react'
// import RNTesseractOcr from 'react-native-tesseract-ocr';
// import ImagePicker from 'react-native-image-picker'
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Button,
//   ActivityIndicator
// } from 'react-native';
//
// import style from './Style'
//
// const styles = StyleSheet.create(style);
//
// const tessOptions = {
//  whitelist: null,
//  blacklist: '1234567890\'!"#$%&/()={}[]+*-_:;<>'
// };
//
// const options = {
//   title: 'Select Image',
//   // customButtons: [
//   //   {name: 'fb', title: 'Choose Photo from Facebook'},
//   // ],
//   storageOptions: {
//     skipBackup: true,
//     path: 'images'
//   },
//   maxWidth: 2250,
//   maxHeight: 2250,
// };
//
// class App extends Component {
//   constructor(props){
//     super(props)
//     this.state={
//       image: 'https://c.kaskus.id/kaskus_forum_image/p3gmvk_1517469439.407_.jpg',
//       ocrResult: ''
//     }
//   }
//
//   upload(){
//     ImagePicker.showImagePicker(options, (response) => {
//       let source = { uri: response.uri, isStatic: true }
//       this.setState({ image: response.uri }, this.readImage(response.path));
//     });
//   }
//   readImage(path) {
//     RNTesseractOcr.recognize(path, 'LANG_INDONESIAN', tessOptions)
//       .then((result) => {
//         this.setState({ isLoading: false, ocrResult: result });
//       })
//       .catch((err) => {
//         alert('OCR Error: ', err);
//       })
//       .done();
//   }
//
//   render() {
//     return (
//       <ScrollView>
//         <View style={styles.container}>
//           <Image style={{width: 200, height: 200}} source={{uri:this.state.image}} />
//           <Button
//             onPress={()=> this.upload()}
//             title="xUpload"
//             color="black"
//           />
//           <ActivityIndicator
//             animating={true}
//             size="large"
//           />
//           <Text>{this.state.ocrResult}</Text>
//         </View>
//       </ScrollView>
//     )
//   }
// }
//
// export default App

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AppRegistry,
  TouchableHighlight,
  Button
} from 'react-native';

import Voice from 'react-native-voice';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      pitch: '',
      error: '',
      end: '',
      started: '',
      results: [],
      partialResults: [],
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechError = this.onSpeechError.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged.bind(this);
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  }

  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  }

  onSpeechEnd(e) {
    this.setState({
      end: '√',
    });
  }

  onSpeechError(e) {
    this.setState({
      error: JSON.stringify(e.error),
    });
  }

  onSpeechResults(e) {
    this.setState({
      results: e.value,
    });
  }

  onSpeechPartialResults(e) {
    this.setState({
      partialResults: e.value,
    });
  }

  onSpeechVolumeChanged(e) {
    this.setState({
      pitch: e.value,
    });
  }

  async _startRecognizing(e) {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: ''
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }

  async _stopRecognizing(e) {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  }

  async _cancelRecognizing(e) {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  }

  async _destroyRecognizer(e) {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: ''
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native Voice!
        </Text>
        <Text style={styles.instructions}>
          Press the button and start speaking.
        </Text>
        <Text
          style={styles.stat}>
          {`Started: ${this.state.started}`}
        </Text>
        <Text
          style={styles.stat}>
          {`Recognized: ${this.state.recognized}`}
        </Text>
        <Text
          style={styles.stat}>
          {`Pitch: ${this.state.pitch}`}
        </Text>
        <Text
          style={styles.stat}>
          {`Error: ${this.state.error}`}
        </Text>
        <Text
          style={styles.stat}>
          Results
        </Text>
        {this.state.results.map((result, index) => {
          return (
            <Text
              key={`result-${index}`}
              style={styles.stat}>
              {result}
            </Text>
          )
        })}
        <Text
          style={styles.stat}>
          Partial Results
        </Text>
        {this.state.partialResults.map((result, index) => {
          return (
            <Text
              key={`partial-result-${index}`}
              style={styles.stat}>
              {result}
            </Text>
          )
        })}
        <Text
          style={styles.stat}>
          {`End: ${this.state.end}`}
        </Text>

          <Button
            color="blue"
            title="Start Recording"
            onPress={()=> this._startRecognizing()}/>

        <TouchableHighlight onPress={this._stopRecognizing.bind(this)}>
          <Text
            style={styles.action}>
            Stop Recognizing
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._cancelRecognizing.bind(this)}>
          <Text
            style={styles.action}>
            Cancel
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._destroyRecognizer.bind(this)}>
          <Text
            style={styles.action}>
            Destroy
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});

export default App
