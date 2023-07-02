import React, {
  memo,
  useEffect,
  useState,
  type FunctionComponent,
} from 'react';
import { ActivityIndicator, Image, ImageBackground } from 'react-native';

const MDImage: FunctionComponent<any> = ({ uri, style }) => {
  const [imageState, setImageState] = useState<any>({
    isLoading: true,
    aspectRatio: undefined,
  });

  useEffect(() => {
    fetchOriginalSizeFromRemoteImage();
  }, []);

  const fetchOriginalSizeFromRemoteImage = () => {
    Image.getSize(
      uri,
      (width: number, height: number) => {
        setImageState({ isLoading: false, aspectRatio: width / height });
      },
      () => {
        setImageState((current: any) => {
          return {
            ...current,
            isLoading: false,
          };
        });
      },
    );
  };

  return (
    <ImageBackground
      source={{ uri: uri }}
      style={{
        width: '100%',
        aspectRatio: imageState.aspectRatio,
      }}
      resizeMode="cover"
      accessibilityRole="image"
      accessibilityHint={undefined}
      imageStyle={style}
      testID="react-native-marked-md-image"
    >
      {imageState.isLoading ? (
        <ActivityIndicator
          testID="react-native-marked-md-image-activity-indicator"
          size={'small'}
        />
      ) : null}
    </ImageBackground>
  );
};

export default memo(MDImage);
