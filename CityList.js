import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Constants } from 'expo';
import * as Animatable from 'react-native-animatable'
import {ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


export default class CityList extends React.Component {

  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, text: '' };
    this.arrayholder = [];
  }


 componentDidMount() {
  return fetch('http://demo6468405.mockable.io/weather-crawlers/cities')
    .then(response => response.json())
    .then(responseJson => {
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson
        },
        function() {
          this.arrayholder = responseJson;
        }
      );
    })
    .catch(error => {
      console.error(error);
    });
}

 SearchFilterFunction(text) {
  //passing the inserted text in textinput
  const newData = this.arrayholder.filter(function(item) {
    //applying filter for the inserted text in search bar
    const itemData = item ? item.toUpperCase() : ''.toUpperCase();
    const textData = text.toUpperCase();
    return itemData.indexOf(textData) > -1;
  });
  this.setState({
    //setting the filtered newData on datasource
    //After setting the data it will automatically re-render the view
    dataSource: newData,
    text: text,
  });
}


onPressCity(item) {
  this.props.navigation.navigate(
    'Detail',
    {
      city: item
    }
  );
}

renderItem(city) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => this.onPressCity(city)}>
      <Text style={styles.text}>{city}</Text>
    </TouchableOpacity>
  );
}


  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };
  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //ListView to show with textinput used as search bar
      <ImageBackground
            source={require('./background.jpg')}
            style={{flex: 1}}
            >

      <View style={styles.viewStyle}>
        <Image
            source={require('./weatherLogo.png')}
            style={styles.image}
         ></Image>

        <Text
            style={{
                backgroundColor: 'rgba(0,0,0,0)',
                padding: 5,
                color:'#cccccc',
                fontSize: 22,
                textAlign:'center'
             }}
             >
             Welcome to Weather app!
         </Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder=" Search Here !"
        />
        <FlatList
          data={this.state.dataSource}

         renderItem={({ item }) => this.renderItem(item)}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      </ImageBackground>
    );
  }


}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },

  image: {
    resizeMode: 'contain',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },

  row: {
    flex: 1,
    height: 50,
    fontSize: 30,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },
  text: {
    fontSize: 30,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    textAlign: 'center',
    padding: 10,
  },
  textInputStyle: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    fontSize: 30,
    color: 'black',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 40
  }


});