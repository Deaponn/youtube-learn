import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Video() {
  const { videoUrl } = useLocalSearchParams();
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Video screen for vid: {videoUrl}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
