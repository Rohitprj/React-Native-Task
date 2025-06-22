// components/LoadingScreen.tsx
import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import SplashScreenComp from "../assets/Logo/striketheball.gif";
const { width, height } = Dimensions.get('window');

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={SplashScreenComp} 
        style={styles.gif}
        resizeMode="cover" // Or "contain", "stretch"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: width,
    height: height,
  },
});

export default LoadingScreen;