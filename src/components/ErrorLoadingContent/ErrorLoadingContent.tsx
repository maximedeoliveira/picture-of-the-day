import { RotateCwIcon } from 'lucide-react-native';
import React, { ReactElement, cloneElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

import Container from '@/components/Container/Container';

type ErrorLoadingContentProps = {
  action: () => void;
  actionTitle?: string;
  actionIcon?: ReactElement;
};

const ErrorLoadingContent = ({
  action,
  actionTitle = 'Réessayer',
  actionIcon = <RotateCwIcon />,
}: ErrorLoadingContentProps) => {
  const theme = useTheme();

  return (
    <Container justifyContent="center" alignItems="center">
      <Text>
        Une erreur s&apos;est produite lors du chargement des données.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={action}
          mode="contained"
          icon={() => cloneElement(actionIcon, { size: 18, color: 'white' })}
          dark={theme.dark}
          testID="error-button"
        >
          {actionTitle}
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
