import { useTheme } from '@react-navigation/native';
import { View, useWindowDimensions } from 'react-native';
import RenderHTML, { useInternalRenderer } from 'react-native-render-html';

import { replaceIfEmpty } from '../utils/globalUtil';
import MDImage from './MDImage';

function CustomImageRenderer(props: any) {
  const { rendererProps } = useInternalRenderer('img', props);
  const { width } = useWindowDimensions();
  return (
    <View style={{ width }}>
      <MDImage uri={rendererProps.source.uri} />
    </View>
  );
}

const WebView: React.FC<any> = ({ body, isNoticia }: any) => {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();

  const renderers = {
    img: CustomImageRenderer,
  };

  return (
    <View>
      <RenderHTML
        contentWidth={width}
        baseStyle={{
          color: isNoticia !== undefined ? '#222' : colors.text,
          width: '98%',
          fontSize: 20,
        }}
        renderers={renderers}
        tagsStyles={{
          body: {
            color: isNoticia !== undefined ? '#222' : colors.text,
          },
          a: {
            color: colors.primary,
          },
        }}
        source={{
          html: body
            .replace(/<br>|<div>&nbsp;<\/div>/gm, '')
            .replace(/<[^>]*>(.*?)<\/[^>]>/gm, replaceIfEmpty),
        }}
        defaultTextProps={{
          selectable: true,
        }}
      />
    </View>
  );
};

export default WebView;
