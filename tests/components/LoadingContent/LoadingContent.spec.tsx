import React from 'react';

import LoadingContent from '@/components/LoadingContent/LoadingContent';

import { render } from '../../utils';

describe('LoadingContent', () => {
  it('render component', () => {
    const component = render(<LoadingContent />);

    expect(component).toMatchSnapshot();
  });
});
