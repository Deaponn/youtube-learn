import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import Searchbar from "@/components/Searchbar";
import SettingsIcon from "@/assets/icons/settings-icon.svg";
import HorizontalList from "@/components/HorizontalList";
import { Colors } from "@/constants/Colors";
import ListVideoCard from "@/components/ListVideoCard";
import useGetVideosList, { AllTopics } from "@/hooks/useGetVideosList";

export default function Index() {
  const [search, setSearch] = useState<string>("");
  const [videosData, setVideosData] = useState<AllTopics>({
    reactNative: [],
    react: [],
    typescript: [],
    javascript: [],
  });

  const reactVideosLoaded = useGetVideosList("react", (results) =>
    setVideosData((prev) => ({ ...prev, react: results }))
  );
  
  const reactNativeVideosLoaded = useGetVideosList("reactNative", (results) =>
    setVideosData((prev) => ({ ...prev, reactNative: results }))
  );
  
  const typescriptVideosLoaded = useGetVideosList("typescript", (results) =>
    setVideosData((prev) => ({ ...prev, typescript: results }))
  );
  
  const javascriptVideosLoaded = useGetVideosList("javascript", (results) =>
    setVideosData((prev) => ({ ...prev, javascript: results }))
  );

  // TODO: better loader
  if (videosData.react.length === 0) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Searchbar
        search={search}
        setSearch={(text) => setSearch(text)}
        placeholder="Search videos"
        rightButton={<SettingsIcon />}
        style={{
          marginTop: 40,
        }}
      />
      <FlatList
        data={[
          { title: "React Native", items: videosData.reactNative },
          { title: "React", items: videosData.react },
          { title: "Typescript", items: videosData.typescript },
          { title: "Javascript", items: videosData.javascript },
        ]}
        renderItem={({ item: { title, items } }) => (
          <HorizontalList
            title={title}
            items={items}
            renderItem={(props) => <ListVideoCard {...props} size="small" />}
            keyExtractor={(item) => item.id.videoId}
            style={{ height: 218, marginTop: 18 }}
          />
        )}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={() => (
          <View style={{ width: "100%", height: 2, backgroundColor: Colors.accent }}></View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 24,
    paddingRight: 24,
  },
});
