import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ecf0f1',
    justifyContent: 'space-around',
    padding: 10,
    marginVertical: 5,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  value: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ItemInfo;
