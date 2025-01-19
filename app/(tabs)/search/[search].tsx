import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Search() {
  const { search } = useLocalSearchParams();
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Search screen. Current search: {search}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
