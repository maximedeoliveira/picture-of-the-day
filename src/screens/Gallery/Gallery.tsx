import React, { useMemo } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import Container from '@/components/Container/Container';
import ErrorLoadingContent from '@/components/ErrorLoadingContent/ErrorLoadingContent';
import LoadingContent from '@/components/LoadingContent/LoadingContent';
import usePictures from '@/hooks/usePictures';
import { Picture } from '@/schemas/Picture';
import ListItem from '@/screens/Gallery/components/ListItem/ListItem';

const Gallery = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = usePictures();

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data),
    [data]
  );

  if (isLoading) {
    return <LoadingContent />;
  }

  if (isError) {
    return <ErrorLoadingContent action={refetch} />;
  }

  const renderItem: ListRenderItem<Picture> = ({ item, index }) => {
    return <ListItem index={index} url={item.url} date={item.date} />;
  };

  return (
    <Container paddingHorizontal={0}>
      <FlatList
        data={flatData}
        keyExtractor={(item) => item.url}
        renderItem={renderItem}
        numColumns={2}
        style={styles.list}
        onEndReached={() => {
          if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage();
          }
        }}
        ListFooterComponent={() => {
          if (isFetchingNextPage) {
            return (
              <View style={styles.footerContainer}>
                <ActivityIndicator animating={true} size="small" />
              </View>
            );
          }

          return <></>;
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: 2,
    paddingTop: 18,
  },
  footerContainer: { paddingVertical: 24 },
});

export default Gallery;
