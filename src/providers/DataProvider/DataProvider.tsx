import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react';

type DataProviderProps = PropsWithChildren;

const queryClient = new QueryClient();

const DataProvider = (props: DataProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export default DataProvider;
