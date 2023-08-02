import Env from '@/config/Env';

type Params = {
  date?: string;
};

export const api = async ({ params = {} }: { params?: Params } = {}) => {
  const queryParams = new URLSearchParams({
    ...(Env.SECURE_API ? { api_key: Env.API_KEY } : {}),
    ...params,
  }).toString();

  return await fetch(`${Env.API_URI}?${queryParams}`).then((res) => res.json());
};
