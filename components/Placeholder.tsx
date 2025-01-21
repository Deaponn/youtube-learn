import { fontStyles } from "@/constants/FontStyles";
import { View, Text, ViewStyle } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface IPlaceholder {
  style: ViewStyle;
}

export default function Placeholder({ style }: IPlaceholder) {
  return (
    <View style={{ borderRadius: 8, backgroundColor: "#CCC", ...style }}>
      <Text style={{ ...fontStyles.poppinsSemiBold22, color: Colors.accent, margin: "auto" }}>
        Loading...
      </Text>
    </View>
  );
}
