import { Colors } from "@/constants/Colors";
import { fontStyles } from "@/constants/FontStyles";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

interface IDoubleToggle {
  leftTitle: string;
  rightTitle: string;
  leftElement: JSX.Element;
  rightElement: JSX.Element;
}

// TODO: toggle animation?

export default function DoubleToggle({
  leftTitle,
  rightTitle,
  leftElement,
  rightElement,
}: IDoubleToggle) {
  const [activeTab, setActiveTab] = useState<"left" | "right">("left");

  return (
    <View style={styles.container}>
      <View style={styles.tabPicker}>
        <Text onPress={() => setActiveTab("left")} style={{...styles.tabTitle, ...(activeTab === "left" ? styles.underline : {})}}>{leftTitle}</Text>
        <Text onPress={() => setActiveTab("right")} style={{...styles.tabTitle, ...(activeTab === "right" ? styles.underline : {})}}>{rightTitle}</Text>
      </View>
      {activeTab === "left" ? leftElement : rightElement}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingLeft: 16,
    paddingRight: 16,
  },
  tabPicker: {
    display: "flex",
    flexDirection: "row",
  },
  tabTitle: {
    flex: 1,
    textAlign: "center",
    color: Colors.accent,
    ...fontStyles.poppinsSemiBold12,
  },
  underline: {
    borderBottomColor: Colors.accent,
    borderBottomWidth: 2,
  }
});
