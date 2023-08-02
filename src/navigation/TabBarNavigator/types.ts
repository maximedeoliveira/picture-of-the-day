import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type TabBarParamList = {
  Home: undefined;
  Gallery: undefined;
};

export type TabBarScreenProps<
  T extends keyof TabBarParamList = keyof TabBarParamList,
> = BottomTabScreenProps<TabBarParamList, T>;
