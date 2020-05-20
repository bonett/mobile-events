import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/dashboard')],
  config: {
    Root: {
      path: 'root',
      screens: {
        Home: 'dashbaord',
        Account: 'account',
      },
    }
  },
};
