import { CompositeScreenProps } from '@react-navigation/native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { ExternalLinkIcon } from 'lucide-react-native';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import ErrorLoadingContent from '@/components/ErrorLoadingContent/ErrorLoadingContent';
import LoadingContent from '@/components/LoadingContent/LoadingContent';
import usePictureOfTheDay from '@/hooks/usePictureOfTheDay';
import { StackScreenProps } from '@/navigation/StackNavigator/types';
import { TabBarScreenProps } from '@/navigation/TabBarNavigator/types';

type HomeProps = CompositeScreenProps<
  TabBarScreenProps<'Home'>,
  StackScreenProps
>;

const { width, height } = Dimensions.get('window');

const Home = ({ navigation }: HomeProps) => {
  const { data: picture, isLoading, isError, refetch } = usePictureOfTheDay();

  if (isLoading) {
    return <LoadingContent />;
  }

  if (isError) {
    return <ErrorLoadingContent action={refetch} />;
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
          <Button
            mode="contained"
            textColor="white"
            style={styles.button}
            icon={() => <ExternalLinkIcon color="white" size={18} />}
            onPress={() =>
              navigation.navigate('Picture', { source: 'pictureOfTheDay' })
            }
            compact
          >
            Détail
          </Button>
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
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    marginTop: 16,
    width: 150,
  },
});

export default Home;
