import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ItemInfo from '../../components/ItemInfo';

function Home() {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [weather, setWeather] = useState({
    description: '',
    temp: 0,
    feels_like: 0,
    humidity: 0,
    speed_wind: 0,
    dt: 0,
    icon: '',
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
    setIsLoaded(false);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=96d424a067dcefe8ebf68c859928548c&lang=pt_br&units=metric`,
      )
      .then((res) => {
        const {data} = res;
        console.log(data.dt);

        setWeather({
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          humidity: data.main.humidity,
          speed_wind: data.wind.speed,
          dt: data.dt,
        });
        setIsLoaded(true);
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
      <Text style={styles.title}>Dados climáticos da sua região</Text>
      <View style={styles.containerTemp}>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
          }}
          style={styles.img}
        />
        <Text style={styles.temp}>{`${weather.temp}º`}</Text>
      </View>

      <Text style={styles.description}>
        {weather.description.toUpperCase()}
      </Text>

      <ItemInfo
        title="Sensação térmica"
        value={`${weather.feels_like}º`}
        icon="temperature-high"
      />

      <ItemInfo
        title="Umidade do ar"
        value={`${weather.humidity}%`}
        icon="tint"
      />

      <ItemInfo
        title="Velocidade do vento"
        value={`${weather.speed_wind}m/s`}
        icon="wind"
      />

      <Text style={styles.updateData}>
        Última atualização: <Icon name="clock" />{' '}
        {moment.unix(weather.dt).format('DD/MM/YYYY hh:mm:ss')}
      </Text>

      <TouchableOpacity onPress={updateData} style={styles.btnUpdate}>
        <Text style={styles.btnText}>
          <Icon name="redo" color="#fff" size={16} /> Atualizar
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#bdc3c7',
  },
  containerTemp: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  img: {
    width: 100,
    height: 100,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
  },
  btnUpdate: {
    paddingVertical: 15,
    backgroundColor: '#2ecc71',
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  temp: {
    fontSize: 50,
    textAlignVertical: 'center',
  },
  updateData: {
    // color: '#7f8c8d',
    color: '#000',
    textAlign: 'right',
    marginVertical: 10,
  },
});

export default Home;
