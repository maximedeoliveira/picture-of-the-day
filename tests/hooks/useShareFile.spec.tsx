import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import useShareFile from '@/hooks/useShareFile';

const downloadAsyncResponse = {
  md5: 'md5',
  uri: 'uri',
  headers: {},
  status: 200,
  mimeType: 'image/jpg',
};

describe('useShareFile', () => {
  it('isLoading is true while downloading file', async () => {
    jest.spyOn(FileSystem, 'downloadAsync').mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(downloadAsyncResponse), 1500);
        })
    );

    const { result, waitFor } = renderHook(() => useShareFile());

    await act(() => {
      result.current.share({
        url: 'https://example.com/file.png',
        title: 'file',
      });
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(
      () => {
        expect(result.current.isLoading).toBeFalsy();
      },
      { timeout: 1500 }
    );
  });

  it('handle error if an error append while downloading file', async () => {
    jest
      .spyOn(FileSystem, 'downloadAsync')
      .mockImplementationOnce(() => Promise.reject('unknown error'));

    const { result } = renderHook(() => useShareFile());

    await act(async () => {
      await result.current.share({
        url: 'https://example.com/file.png',
        title: 'file',
      });
    });

    expect(result.current.isError).toBeTruthy();
    expect(result.current.isLoading).toBeFalsy();

    await act(() => {
      result.current.clear();
    });

    expect(result.current.isError).toBeFalsy();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('handle error if an error append while sharing file', async () => {
    jest
      .spyOn(Sharing, 'shareAsync')
      .mockImplementationOnce(() => Promise.reject('unknown error'));

    const { result } = renderHook(() => useShareFile());

    await act(async () => {
      await result.current.share({
        url: 'https://example.com/file.png',
        title: 'file',
      });
    });

    expect(result.current.isError).toBeTruthy();
    expect(result.current.isLoading).toBeFalsy();

    await act(() => {
      result.current.clear();
    });

    expect(result.current.isError).toBeFalsy();
    expect(result.current.isLoading).toBeFalsy();
  });
});
