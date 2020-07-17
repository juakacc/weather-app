import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from './styles';

const ItemInfo = ({title, value, icon}) => {
  return (
    <View style={styles.container}>
      <Icon name={icon} color="#000" size={35} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

export default ItemInfo;
