import { act, waitForElementToBeRemoved } from '@testing-library/react-native';

import Home from '@/screens/Home/Home';

import { render } from '../../utils';

describe('Home', () => {
  it("render today's picture", async () => {
    const { getByTestId, getByText } = render(<Home />);

    await act(async () => {
      // Assert loader is visible
      expect(getByTestId('loader')).toBeTruthy();

      // Assert loader is removed
      await waitForElementToBeRemoved(() => getByTestId('loader'));

      // Assert screen contains today's date
      expect(getByText('2023-08-04')).toBeTruthy();
    });
  });
});
