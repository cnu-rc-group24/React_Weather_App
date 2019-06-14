import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';
import { weatherStatus } from './WeatherStatus';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Component } from 'react';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    var randomNumber = Math.floor(Math.random() * 3) + 1;
    const { navigation } = this.props;
    const city = navigation.getParam('city');
    const api = '9aa01efefbf62c6cc921e297f99f3551';
    //const city = 'Daejeon';

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api}`)
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
          numberHolder: randomNumber,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.load}>
          <Text>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }

    let celsius = this.state.main.temp - 273.15;
    let nowWeather = this.state.weather[0].main;
    //let wind = this.state.wind.speed;
    //let pressure = this.state.main.pressure;
    let humidity = this.state.main.humidity;
    //let cloud = this.state.clouds.all;
    var water_icon = 'md-water';
    return (
      <View style={[styles.container, {backgroundColor: weatherStatus[nowWeather].color}]}>
        <View style={styles.head}>
          <MaterialCommunityIcons size={60} name={weatherStatus[nowWeather].icon} color='#ffffff' />
          <Text style={styles.temperature}>{celsius.toFixed(1)}°</Text>
        </View>
        <View style={styles.head}>
                  <MaterialCommunityIcons size={60} name="water" color='#ffffff' />
                  <Text style={styles.temperature}>{humidity}%</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.nowWeather}>{weatherStatus[nowWeather].title}</Text>
          {this.state.numberHolder == 1? <Text style={styles.explain}>{weatherStatus[nowWeather].subtitle}</Text>:null }
          {this.state.numberHolder == 2? <Text style={styles.explain}>{weatherStatus[nowWeather].subtitle2}</Text>:null }
          {this.state.numberHolder == 3? <Text style={styles.explain}>{weatherStatus[nowWeather].subtitle3}</Text>:null }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  load: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: Constants.statusBarHeight,
    alignItems: 'center',
    fontSize: 20,
  },

  container: {
    flex: 1
  },

  head: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  temperature: {
    fontSize: 60,
    color: '#ffffff'
  },

  body: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },

  nowWeather: {
    fontSize: 40,
    color: '#ffffff'
  },

  explain: {
    fontSize: 18,
    color: '#ffffff'
  }
});
