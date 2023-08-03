import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ErrorLoadingContent from '@/components/ErrorLoadingContent/ErrorLoadingContent';
import LoadingContent from '@/components/LoadingContent/LoadingContent';
import usePictureOfTheDay from '@/hooks/usePictureOfTheDay';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const { data: picture, isLoading, isError, refetch } = usePictureOfTheDay();

  if (isLoading) {
    return <LoadingContent />;
  }

  if (isError) {
    return <ErrorLoadingContent refetch={refetch} />;
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
  date: {
    marginBottom: 8,
    color: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Home;
