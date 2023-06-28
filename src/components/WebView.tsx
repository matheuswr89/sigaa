import { useTheme } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import RenderHTML, {
  defaultHTMLElementModels,
  HTMLContentModel,
} from "react-native-render-html";

const WebView: React.FC<any> = ({ body }) => {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();

  const renderersProps = {
    img: {
      enableExperimentalPercentWidth: true,
    },
  };
  const customHTMLElementModels = {
    img: defaultHTMLElementModels.img.extend({
      contentModel: HTMLContentModel.mixed,
    }),
  };

  return (
    <RenderHTML
      contentWidth={width}
      baseStyle={{
        color: colors.text,
        width: width - 40,
        fontSize: 20,
      }}
      renderersProps={renderersProps}
      customHTMLElementModels={customHTMLElementModels}
      tagsStyles={{
        body: {
          color: colors.text,
        },
        a: {
          color: colors.primary,
        },
      }}
      source={{
        html: body + "",
      }}
    />
  );
};

export default WebView;
