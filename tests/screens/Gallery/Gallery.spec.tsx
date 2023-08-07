import {
  act,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import React from 'react';

import Gallery from '@/screens/Gallery/Gallery';

import { render } from '../../utils';

const scrollEventData = {
  nativeEvent: {
    contentOffset: {
      y: 500,
    },
    // Dimensions of the scrollable content
    contentSize: {
      height: 500,
      width: 300,
    },
    // Dimensions of the device
    layoutMeasurement: {
      height: 500,
      width: 300,
    },
  },
};

describe('Gallery', () => {
  it('render gallery', async () => {
    const { getByTestId } = render(<Gallery />);

    // Assert loader is visible
    expect(getByTestId('loader')).toBeTruthy();

    // Assert loader is removed
    await act(async () => {
      await waitForElementToBeRemoved(() => getByTestId('loader'), {
        timeout: 30000,
      });
    });

    // Assert list is visible
    await act(() => {
      expect(getByTestId('gallery-list')).toBeTruthy();
    });
  }, 30000);

  it('show footer loader when end of list is reached', async () => {
    const { getByTestId } = render(<Gallery />);

    // Assert loader is visible
    expect(getByTestId('loader')).toBeTruthy();

    // Assert loader is removed
    await act(async () => {
      await waitForElementToBeRemoved(() => getByTestId('loader'), {
        timeout: 30000,
      });
    });

    fireEvent.scroll(getByTestId('gallery-list'), scrollEventData);

    // Assert list loader is visible
    await act(async () => {
      await waitFor(() => {
        expect(getByTestId('gallery-footer-loader')).toBeTruthy();
      });
    });
  }, 30000);

  it('render error component if an error is throw', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.reject('unknown error'));

    const { getByTestId, getByText } = render(<Gallery />);

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
  }, 30000);
});
