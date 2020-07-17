import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from './styles';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Icon name="cloud-sun-rain" size={30} /> WeatherApp
      </Text>
    </View>
  );
}
