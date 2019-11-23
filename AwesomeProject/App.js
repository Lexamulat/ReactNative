import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './Routes.js'
import SecondScreen from './components/SecondScreen/SecondScreen'

export default function App() {

  return (
    // <View style={styles.container}>
     
    // </View>
    <Routes />
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
