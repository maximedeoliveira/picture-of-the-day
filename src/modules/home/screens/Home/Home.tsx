import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { RotateCwIcon } from 'lucide-react-native';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import usePictureOfTheDay from '@/modules/home/screens/Home/hooks/usePictureOfTheDay';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const { data: picture, isLoading, isError, refetch } = usePictureOfTheDay();

  if (isLoading) {
    return (
      <SafeAreaView edges={['top', 'right', 'left']} style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView edges={['top', 'right', 'left']} style={styles.container}>
        <Text>Unable to load data</Text>
        <Button
          onPress={() => refetch()}
          mode="contained"
          icon={() => <RotateCwIcon size={18} color="white" />}
          style={styles.retryButton}
        >
          Retry
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView edges={['top', 'right', 'left']} style={styles.container}>
        {picture && (
          <Image source={{ uri: picture?.url }} style={styles.image} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.date}>{picture?.date}</Text>
          <Text style={styles.title}>{picture?.title}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    height,
  },
  textContainer: {
    position: 'absolute',
    bottom: 32,
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  date: {
    marginBottom: 8,
    color: 'white',
  },
  retryButton: {
    marginTop: 12,
  },
});

export default Home;
