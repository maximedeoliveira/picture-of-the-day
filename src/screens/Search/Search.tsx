import { CompositeScreenProps } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { fr, registerTranslation } from 'react-native-paper-dates';

import Container from '@/components/Container/Container';
import { fetchPictureByDate, pictureByDateKey } from '@/hooks/usePictureByDate';
import { StackScreenProps } from '@/navigation/StackNavigator/types';
import { TabBarScreenProps } from '@/navigation/TabBarNavigator/types';

registerTranslation('fr', fr);

type SearchProps = CompositeScreenProps<
  TabBarScreenProps<'Search'>,
  StackScreenProps
>;

const Search = ({ navigation }: SearchProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputDate, setInputDate] = React.useState<Date | undefined>(undefined);

  const theme = useTheme();
  const queryClient = useQueryClient();

  const handleSearch = async () => {
    if (!inputDate) return;

    setIsLoading(true);

    const date = dayjs(inputDate).format('YYYY-MM-DD');

    await queryClient
      .prefetchQuery({
        queryKey: pictureByDateKey(date),
        queryFn: () => fetchPictureByDate(date),
      })
      .then(() => {
        navigation.navigate('Picture', { source: 'picture', date });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Container style={styles.container}>
      <Text style={styles.title}>Recherche</Text>
      <View style={styles.formField}>
        <DatePickerInput
          locale="fr"
          label="Date"
          value={inputDate}
          onChange={(d) => setInputDate(d)}
          inputMode="start"
        />
      </View>
      <Button
        onPress={handleSearch}
        mode="contained"
        dark={theme.dark}
        loading={isLoading}
      >
        Rechercher
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  formField: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {},
  button: {},
});

export default Search;
