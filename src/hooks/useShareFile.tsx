import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useState } from 'react';

const useShareFile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const share = async ({ url, title }: { url: string; title: string }) => {
    setIsLoading(true);

    const fileUri =
      FileSystem.cacheDirectory +
      title.toLowerCase().replaceAll(' ', '-') +
      '.jpg';

    const options = {
      mimeType: 'image/jpeg',
      dialogTitle: 'Partager une image',
      UTI: 'image/jpeg',
    };

    FileSystem.downloadAsync(url, fileUri)
      .then(() => {
        Sharing.shareAsync(fileUri, options).catch(() => {
          setIsError(true);
        });
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  };

  const clear = () => {
    setIsError(false);
  };

  return { share, isLoading, isError, clear };
};

export default useShareFile;
