import { API_KEY, API_URI, SECURE_API } from '@env';
import { z } from 'zod';

// Define schema
const schema = z
  .object({
    SECURE_API: z
      .enum(['true', 'false'])
      .default('true')
      .transform((val) => val === 'true'),
    API_URI: z.string().url(),
    API_KEY: z.string().default(''),
  })
  .refine(
    (val) => {
      if (val.SECURE_API) {
        return !!val.API_KEY;
      }

      return true;
    },
    { path: ['API_KEY'], message: 'required' }
  );

// Get environment variables from process
const _env = {
  SECURE_API: SECURE_API,
  API_URI: API_URI,
  API_KEY: API_KEY,
};

const parsedEnv = schema.safeParse(_env);

// Throw an error if some variables does not exist in .env
if (!parsedEnv.success) {
  console.error(
    '❌ Invalid environment variables:',
    parsedEnv.error.flatten().fieldErrors
  );

  throw new Error(
    'Invalid environment variables, Check terminal for more details ' +
      JSON.stringify(parsedEnv.error.flatten().fieldErrors)
  );
}

export default parsedEnv.data;
