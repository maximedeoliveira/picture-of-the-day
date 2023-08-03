import React, { PropsWithChildren } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = PropsWithChildren & {
  style?: ViewStyle;
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
  paddingHorizontal?: number;
};

const Container = (props: ScreenProps) => {
  const theme = useTheme();

  return (
    <SafeAreaView
      edges={['top', 'right', 'left']}
      style={[
        styles.container,
        {
          paddingHorizontal: props.paddingHorizontal ?? 12,
          backgroundColor: theme.colors.background,
          justifyContent: props?.justifyContent,
          alignItems: props?.alignItems,
        },
        props.style,
      ]}
    >
      {props.children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Container;
