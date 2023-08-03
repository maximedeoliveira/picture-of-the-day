import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

import { StackScreenProps } from '@/navigation/StackNavigator/types';

type ItemProps = {
  url: string;
  date: string;
  index: number;
};

const { width } = Dimensions.get('window');

const ListItem = (props: ItemProps) => {
  const navigation = useNavigation<StackScreenProps['navigation']>();

  const { itemContainer, itemImage } = styles(props.index);

  return (
    <View style={itemContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Picture', {
            source: 'pictures',
            date: props.date,
          })
        }
      >
        <Image source={{ uri: props.url }} style={itemImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = (index: number) =>
  StyleSheet.create({
    itemContainer: {
      paddingBottom: 8,
      paddingRight: index % 2 ? 0 : 4,
      paddingLeft: index % 2 ? 4 : 0,
    },
    itemImage: {
      width: (width - 32) / 2,
      aspectRatio: 1,
      borderRadius: 24,
    },
  });

export default ListItem;
