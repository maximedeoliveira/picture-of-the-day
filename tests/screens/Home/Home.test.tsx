import {
  act,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import dayjs from 'dayjs';
import React from 'react';

import Home from '@/screens/Home/Home';

import { render } from '../../utils';

describe('Home', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockedProps: any = {};
  const today = dayjs().format('YYYY-MM-DD');

  beforeEach(() => {
    mockedProps = {
      navigation: {
        navigate: jest.fn(),
      },
      route: {},
    };
  });

  it("render today's picture", async () => {
    const { getByTestId, getByText } = render(<Home {...mockedProps} />);

    // Assert loader is visible
    expect(getByTestId('loader')).toBeTruthy();

    // Assert loader is removed
    await act(async () => {
      await waitForElementToBeRemoved(() => getByTestId('loader'));
    });

    // Assert screen contains today's date
    expect(getByText(today)).toBeTruthy();
  });

  it('redirect to picture screen when click on details', async () => {
    const { getByTestId, getByText } = render(<Home {...mockedProps} />);

    // Assert loader is visible
    expect(getByTestId('loader')).toBeTruthy();

    // Assert loader is removed
    await act(async () => {
      await waitForElementToBeRemoved(() => getByTestId('loader'));
    });

    // Assert navigate is called when click on button
    fireEvent.press(getByText('Détail'));
    expect(mockedProps.navigation.navigate).toBeCalledWith('Picture', {
      source: 'picture',
      date: today,
    });
  });

  it('render error component if an error happend', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.reject('unknown error'));

    const { getByTestId, getByText } = render(<Home {...mockedProps} />);

    // Assert loader is visible
    expect(getByTestId('loader')).toBeTruthy();

    // Assert loader is removed
    await act(async () => {
      await waitForElementToBeRemoved(() => getByTestId('loader'));
    });

    // Assert screen contains today's date
    await act(() => {
      expect(
        getByText("Une erreur s'est produite lors du chargement des données.")
      ).toBeTruthy();
    });
  });
});
