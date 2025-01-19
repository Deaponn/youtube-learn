import { VideoResponseData } from "@/app/(tabs)/_layout";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface IHorizontalList {
  title: string;
  items: VideoResponseData[];
}

export default function HorizontalList({ title, items }: IHorizontalList) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <Link href={`/(tabs)/search/${title}`}>{`/(tabs)/search/${title}`}</Link>
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => <Text>{item.snippet.title}</Text>}
        keyExtractor={(item) => item.id.videoId}
        horizontal={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerText: {
    color: Colors.accent
  }
})
