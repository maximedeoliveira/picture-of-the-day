import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Snackbar,
  Text,
  useTheme,
} from 'react-native-paper';

import Container from '@/components/Container/Container';
import usePicture from '@/hooks/usePicture';
import useShareFile from '@/hooks/useShareFile';
import { StackScreenProps } from '@/navigation/StackNavigator/types';

type PictureProps = StackScreenProps<'Picture'>;

const { width } = Dimensions.get('window');

const Picture = ({ route, navigation }: PictureProps) => {
  const theme = useTheme();
  const { share, isLoading, isError, clear } = useShareFile();

  const { data } = usePicture(route.params);

  const handleShare = async () => {
    if (!data?.url) return;

    await share({ url: data?.url, title: data?.title });
  };

  return (
    <Container edges={['left', 'right', 'top']} paddingHorizontal={0}>
      <Appbar.Header mode="small" style={styles.appBar} statusBarHeight={0}>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        {data?.date && (
          <Appbar.Content
            title={data?.date}
            titleStyle={styles.appBarContent}
          />
        )}
        <Appbar.Action
          icon={
            !isLoading
              ? 'share-variant'
              : () => <ActivityIndicator color="white" size={18} />
          }
          onPress={handleShare}
        />
      </Appbar.Header>
      <ScrollView style={styles.scrollview}>
        <Text style={styles.title}>{data?.title}</Text>
        {data?.copyright && (
          <Text style={styles.copyright}>{data.copyright}</Text>
        )}
        <Image source={{ uri: data?.url }} style={styles.image} />
        <Text style={styles.description}>{data?.explanation}</Text>
      </ScrollView>
      <Snackbar
        visible={isError}
        onDismiss={() => clear()}
        action={{
          label: 'Fermer',
          onPress: () => clear(),
        }}
        style={{ backgroundColor: theme.colors.background }}
      >
        <Text>
          Une erreur s&apos;est produite lors de la récupération de l&apos;image
        </Text>
      </Snackbar>
    </Container>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 48,
  },
  appBarContent: {
    fontSize: 18,
  },
  scrollview: {
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  copyright: {
    fontSize: 18,
    marginTop: 4,
  },
  image: {
    width: width - 24,
    aspectRatio: 1,
    marginVertical: 24,
    borderRadius: 18,
  },
  description: {
    textAlign: 'justify',
  },
});

export default Picture;
