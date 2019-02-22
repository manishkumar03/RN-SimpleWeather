import React from 'react';
import {Platform,StyleSheet, Text, TextInput, View, KeyboardAvoidingView, ImageBackground} from 'react-native';
import SearchInput from './components/SearchInput';
import getImageForWeather from './utils/getImageForWeather';
import { fetchLocationId, fetchWeather } from './utils/api';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '',
      temperature: 0,
      weather: '',
    };
  }

  componentDidMount() {
    this.handleUpdateLocation('Toronto');
  }

  handleUpdateLocation = (newCity) => {
    //this.setState({location: newCity}); // invoking setState causes the component to call render()
    this.setState({weather: ''}, async () => {
      try {
        const locationId = await fetchLocationId(newCity);
        const {location, weather, temperature} = await fetchWeather(locationId);

        this.setState({
          location,
          weather,
          temperature,
        });
      } catch (e) {

      }
    }
    );
  };

  render() {
    const {location, weather, temperature} = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ImageBackground source={getImageForWeather('Clear')} style={styles.imageContainer} imageStyle={styles.image}>
        <View style={styles.detailsContainer}>
          <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
          <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
          <Text style={[styles.largeText, styles.textStyle]}>{`${Math.round(temperature)}°`}</Text>
          <SearchInput placeholder="Type any city name" onSubmit={this.handleUpdateLocation}></SearchInput>
        </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  red: {
    color: 'red',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  }
});