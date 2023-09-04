const LIGHT_SPLASH = {
  image: './assets/SIGAALOGIN.png',
  backgroundColor: '#FFFFFF',
  resizeMode: 'native',
};

const DARK_SPLASH = {
  image: './assets/SIGAALOGIN.png',
  backgroundColor: '#101010',
  resizeMode: 'native',
};

const SHARED_SPLASH = {
  splash: {
    ...LIGHT_SPLASH,
    dark: {
      ...DARK_SPLASH,
    },
  },
};

const config = {
  name: 'SIGAA Mobile',
  slug: 'sigaa',
  version: '1.2.8',
  orientation: 'portrait',
  icon: './assets/SIGAA.png',
  userInterfaceStyle: 'automatic',
  splash: LIGHT_SPLASH,
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    ...SHARED_SPLASH,
    supportsTablet: true,
    bundleIdentifier: 'com.sigaa',
    buildNumber: '1.2.8',
  },
  android: {
    ...SHARED_SPLASH,
    package: 'com.sigaa',
    versionCode: 58,
    userInterfaceStyle: 'automatic',
    googleServicesFile: './google-services.json',
  },
  web: {
    favicon: './assets/SIGAA.png',
    ...SHARED_SPLASH,
  },
  extra: {
    eas: {
      projectId: 'ed6d4bca-d4ae-4bc2-94d6-07ba8baa5e09',
    },
  },
  plugins: ['@react-native-firebase/app', '@react-native-firebase/crashlytics'],
};

export default config;
