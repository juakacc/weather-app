import React, {useEffect, useState} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

function Home() {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
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

  return (
    <View>
      <Text>
        {position.latitude} {position.longitude}
      </Text>
    </View>
  );
}

export default Home;
