import { CompositeScreenProps } from '@react-navigation/native';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import { SearchIcon } from 'lucide-react-native';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

import Container from '@/components/Container/Container';
import ErrorLoadingContent from '@/components/ErrorLoadingContent/ErrorLoadingContent';
import LoadingContent from '@/components/LoadingContent/LoadingContent';
import usePictureByDate from '@/hooks/usePictureByDate';
import { StackScreenProps } from '@/navigation/StackNavigator/types';
import { TabBarScreenProps } from '@/navigation/TabBarNavigator/types';

type HomeProps = CompositeScreenProps<
  TabBarScreenProps<'Home'>,
  StackScreenProps
>;

const { width, height } = Dimensions.get('window');

const Home = ({ navigation }: HomeProps) => {
  const today = dayjs().format('YYYY-MM-DD');

  const theme = useTheme();

  const {
    data: picture,
    isLoading,
    isError,
    refetch,
  } = usePictureByDate(today);

  if (isLoading) {
    return <LoadingContent />;
  }

  if (isError) {
    return <ErrorLoadingContent action={refetch} />;
  }

  return (
    <Container
      statusBarColor="light"
      edges={['right', 'left']}
      paddingHorizontal={0}
    >
      {picture && <Image source={{ uri: picture?.url }} style={styles.image} />}
      <View style={styles.textContainer}>
        <Text style={styles.date}>{picture?.date}</Text>
        <Text style={styles.title}>{picture?.title}</Text>
        <Button
          mode="elevated"
          style={styles.button}
          icon={() => <SearchIcon color={theme.colors.primary} size={18} />}
          onPress={() =>
            navigation.navigate('Picture', { source: 'picture', date: today })
          }
        >
          Détail
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
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
    width: 120,
  },
});

export default Home;
