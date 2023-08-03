import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

type ItemProps = {
  url: string;
  index: number;
};

const { width } = Dimensions.get('window');

const ListItem = (props: ItemProps) => {
  const { itemContainer, itemImage } = styles(props.index);

  return (
    <View style={itemContainer}>
      <Image source={{ uri: props.url }} style={itemImage} />
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
