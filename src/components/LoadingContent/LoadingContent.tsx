import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

import Container from '@/components/Container/Container';

const LoadingContent = () => {
  return (
    <Container justifyContent="center" alignItems="center">
      <ActivityIndicator testID="loader" />
    </Container>
  );
};

export default LoadingContent;
