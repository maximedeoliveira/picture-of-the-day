import { fireEvent } from '@testing-library/react-native';
import { HandIcon } from 'lucide-react-native';
import React from 'react';

import ErrorLoadingContent from '@/components/ErrorLoadingContent/ErrorLoadingContent';

import { render } from '../../utils';

describe('ErrorLoadingComponent', () => {
  it('render component', async () => {
    const component = render(<ErrorLoadingContent action={() => {}} />);

    expect(component).toMatchSnapshot();
  });

  it('render component with custom props', () => {
    const component = render(
      <ErrorLoadingContent
        action={() => {}}
        actionTitle="Hello"
        actionIcon={<HandIcon />}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('call action props when click on button', () => {
    const mockedAction = jest.fn();
    const { getByTestId } = render(
      <ErrorLoadingContent action={mockedAction} />
    );

    fireEvent.press(getByTestId('error-button'));
    expect(mockedAction).toBeCalled();
  });
});
