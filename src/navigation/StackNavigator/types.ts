import { StackScreenProps as RNStackScreenProps } from '@react-navigation/stack';

export type StackParamList = {
  Tab: undefined;
  Picture: { source: 'pictureOfTheDay' } | { source: 'pictures'; date: string };
};

export type StackScreenProps<
  T extends keyof StackParamList = keyof StackParamList,
> = RNStackScreenProps<StackParamList, T>;
