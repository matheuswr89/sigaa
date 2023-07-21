import { memo, useEffect, useState, type FunctionComponent } from 'react';
import { ActivityIndicator, NativeModules } from 'react-native';
import FitImage from 'react-native-fit-image';

const MDImage: FunctionComponent<any> = ({ uri }) => {
  const [base64, setBase64] = useState();

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    const base = await NativeModules.PythonModule.image(uri);
    setBase64(base);
  };

  return base64 ? (
    <FitImage source={{ uri: base64 }} resizeMode="contain" />
  ) : (
    <ActivityIndicator
      testID="react-native-marked-md-image-activity-indicator"
      size={'small'}
    />
  );
};

export default memo(MDImage);
