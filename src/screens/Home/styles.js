import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  container: {
    // flex: 1,
    flexGrow: 1,
    padding: 15,
    // backgroundColor: '#3498db',
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
    color: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#fff',
  },
  btnUpdate: {
    paddingVertical: 15,
    // marginBottom: 20,
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
    color: '#fff',
  },
  updateData: {
    color: '#fff',
    textAlign: 'right',
    marginVertical: 10,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default styles;
