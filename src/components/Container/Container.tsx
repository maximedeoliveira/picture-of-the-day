import React, { PropsWithChildren } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type Edges = 'top' | 'right' | 'bottom' | 'left';

type ScreenProps = PropsWithChildren & {
  edges?: Array<Edges>;
  style?: ViewStyle;
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
  paddingHorizontal?: number;
};

const Container = ({
  edges = ['top', 'right', 'left'],
  ...props
}: ScreenProps) => {
  const theme = useTheme();

  return (
    <SafeAreaView
      edges={edges}
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
