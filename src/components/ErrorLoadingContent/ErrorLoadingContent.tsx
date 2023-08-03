import { RotateCwIcon } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

import Container from '@/components/Container/Container';

type ErrorLoadingContentProps = {
  refetch: () => void;
};

const ErrorLoadingContent = (props: ErrorLoadingContentProps) => {
  const theme = useTheme();

  return (
    <Container justifyContent="center" alignItems="center">
      <Text>
        Une erreur s&apos;est produite lors du chargement des données.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => props.refetch()}
          mode="contained"
          icon={() => <RotateCwIcon size={18} color="white" />}
          dark={theme.dark}
        >
          Réessayer
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 12,
  },
});

export default ErrorLoadingContent;
