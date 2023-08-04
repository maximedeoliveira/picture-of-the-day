import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StatusBarProps } from 'expo-status-bar/src/StatusBar.types';
import React from 'react';

type FocusedStatusBarProps = StatusBarProps;

const FocusedStatusBar = (props: FocusedStatusBarProps) => {
  const isFocus = useIsFocused();

  return isFocus ? <StatusBar {...props} /> : null;
};

export default FocusedStatusBar;
