import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderOptions, render } from '@testing-library/react-native';
import React, { ReactElement } from 'react';

const queryClient = {
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
};

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={new QueryClient(queryClient)}>
        {children}
      </QueryClientProvider>
    </NavigationContainer>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
