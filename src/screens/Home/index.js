import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';

function Home() {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [weather, setWeather] = useState({
    description: '',
    temp: 0,
    temp_min: 0,
    temp_max: 0,
    humidity: 0,
    speed_wind: 0,
    dt: 0,
  });

  const hasPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setHasLocationPermission(true);
    } else {
      console.log('Permissão negada');
      setHasLocationPermission(false);
    }
  };

  useEffect(() => {
    hasPermission();
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (positionResponse) => {
          setPosition({
            latitude: positionResponse.coords.latitude,
            longitude: positionResponse.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, [hasLocationPermission]);

  const updateData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=96d424a067dcefe8ebf68c859928548c&lang=pt_br&units=metric`,
      )
      .then((res) => {
        const {data} = res;
        console.log(data.dt);

        setWeather({
          description: data.weather[0].description,
          temp: data.main.temp,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          humidity: data.main.humidity,
          speed_wind: data.wind.speed,
          dt: data.dt,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    updateData();
  }, [position]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dados climátivos da sua região</Text>

      <View style={styles.containerTemp}>
        <Text>{weather.description.toUpperCase()}</Text>
        <Text style={styles.temp}>
          <Icon name="temperature-low" size={30} /> {weather.temp}º
        </Text>
      </View>

      <Text>
        Humidade do ar: <Icon name="tint" color="#000" /> {weather.humidity}%
      </Text>

      <Text>
        Velocidade do vento: <Icon name="wind" color="#000" />{' '}
        {weather.speed_wind}m/s
      </Text>

      <Text style={styles.updateData}>
        Última atualização: <Icon name="clock" />
        {moment.unix(weather.dt).format('DD/MM/YYYY hh:mm:ss')}
      </Text>

      <TouchableOpacity onPress={updateData} style={styles.btnUpdate}>
        <Text style={styles.btnText}>
          <Icon name="redo" color="#fff" /> Atualizar
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  containerTemp: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
  },
  btnUpdate: {
    padding: 10,
    margin: 5,
    alignSelf: 'center',
    backgroundColor: '#2ecc71',
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
  },
  temp: {
    fontSize: 50,
  },
  updateData: {
    color: '#7f8c8d',
  },
});

export default Home;
