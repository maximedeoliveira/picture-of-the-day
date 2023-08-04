import React, { PropsWithChildren } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import FocusedStatusBar from '@/components/FocusedStatusBar/FocusedStatusBar';

type Edges = 'top' | 'right' | 'bottom' | 'left';

type ScreenProps = PropsWithChildren & {
  edges?: Array<Edges>;
  style?: ViewStyle;
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
  paddingHorizontal?: number;
  statusBarColor?: 'light' | 'dark';
};

const Container = ({
  edges = ['top', 'right', 'left'],
  statusBarColor = 'dark',
  ...props
}: ScreenProps) => {
  const theme = useTheme();

  return (
    <>
      <FocusedStatusBar style={statusBarColor} />
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Container;
