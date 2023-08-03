import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Gallery = () => {
  return (
    <View style={styles.container}>
      <Text>Gallery!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Gallery;
