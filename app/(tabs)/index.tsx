import { useContext, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { VideosContext } from "@/app/(tabs)/_layout";
import Searchbar from "@/components/Searchbar";
import SettingsIcon from "@/assets/icons/settings-icon.svg";
import HorizontalList from "@/components/HorizontalList";

export default function Index() {
  const videos = useContext(VideosContext);
  const [search, setSearch] = useState<string>("");

  // TODO: better loader
  if (videos.react.length === 0) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Searchbar
        search={search}
        setSearch={(text) => setSearch(text)}
        rightButton={<SettingsIcon />}
        style={{
          marginTop: 40
        }}
      />
      <HorizontalList title={"React Native"} items={videos.reactNative} />
      <HorizontalList title={"React"} items={videos.react} />
      <HorizontalList title={"Typescript"} items={videos.typescript} />
      <HorizontalList title={"Javascript"} items={videos.javascript} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
