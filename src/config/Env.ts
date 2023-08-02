import { z } from 'zod';

// Define schema
const schema = z
  .object({
    SECURE_API: z
      .enum(['true', 'false'])
      .default('true')
      .transform((val) => val === 'true'),
    API_URI: z.string().url(),
    API_KEY: z.string(),
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
  SECURE_API: process.env.EXPO_PUBLIC_SECURE_API,
  API_URI: process.env.EXPO_PUBLIC_API_URI,
  API_KEY: process.env.EXPO_PUBLIC_API_KEY,
};

const parsedEnv = schema.safeParse(_env);

// Throw an error if some variables does not exist in .env
if (!parsedEnv.success) {
  console.error(
    '❌ Invalid environment variables:',
    parsedEnv.error.flatten().fieldErrors
  );

  throw new Error(
    'Invalid environment variables, Check terminal for more details '
  );
}

export default parsedEnv.data;
