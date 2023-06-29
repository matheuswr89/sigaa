import { useTheme } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import RenderHTML, {
  defaultHTMLElementModels,
  HTMLContentModel,
} from "react-native-render-html";
import { replaceIfEmpty } from "../utils/globalUtil";

const WebView: React.FC<any> = ({ body, isNoticia }: any) => {
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
        color: isNoticia !== undefined ? "#222" : colors.text,
        width: "98%",
        fontSize: 20,
      }}
      renderersProps={renderersProps}
      customHTMLElementModels={customHTMLElementModels}
      tagsStyles={{
        body: {
          color: isNoticia !== undefined ? "#222" : colors.text,
        },
        a: {
          color: colors.primary,
        },
      }}
      source={{
        html: body
          .replace(/<br>|<div>&nbsp;<\/div>/gm, "")
          .replace(/<[^>]*>(.*?)<\/[^>]>/gm, replaceIfEmpty),
      }}
    />
  );
};

export default WebView;
