// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsconfig = require('./tsconfig.json');

const rawAlias = tsconfig.compilerOptions.paths;
let alias = {};

for (let x in rawAlias) {
  alias[x.replace('/*', '')] = rawAlias[x].map((p) => p.replace('/*', ''));
}

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv'],
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias,
        },
      ],
    ],
  };
};
