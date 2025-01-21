import { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Searchbar from "@/components/Searchbar";
import SettingsIcon from "@/assets/icons/settings-icon.svg";
import HorizontalList from "@/components/HorizontalList";
import { Colors } from "@/constants/Colors";
import ListVideoCard from "@/components/ListVideoCard";
import useApiRequest from "@/hooks/useApiRequest";
import { AllTopics, buildVideosQuery, VideoResponse } from "@/helpers/buildQueryUrl";
import Placeholder from "@/components/Placeholder";

export default function Index() {
  const [search, setSearch] = useState<string>("");
  const [videosData, setVideosData] = useState<AllTopics>({
    reactNative: [],
    react: [],
    typescript: [],
    javascript: [],
  });

  const reactVideosLoaded = useApiRequest<VideoResponse>(buildVideosQuery("react"), (results) =>
    setVideosData((prev) => ({ ...prev, react: results.items }))
  );

  const reactNativeVideosLoaded = useApiRequest<VideoResponse>(
    buildVideosQuery("reactNative"),
    (results) => setVideosData((prev) => ({ ...prev, reactNative: results.items }))
  );

  const typescriptVideosLoaded = useApiRequest<VideoResponse>(
    buildVideosQuery("typescript"),
    (results) => setVideosData((prev) => ({ ...prev, typescript: results.items }))
  );

  const javascriptVideosLoaded = useApiRequest<VideoResponse>(
    buildVideosQuery("javascript"),
    (results) => setVideosData((prev) => ({ ...prev, javascript: results.items }))
  );

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
          { title: "React Native", items: videosData.reactNative, loaded: reactVideosLoaded },
          { title: "React", items: videosData.react, loaded: reactNativeVideosLoaded },
          { title: "Typescript", items: videosData.typescript, loaded: typescriptVideosLoaded },
          { title: "Javascript", items: videosData.javascript, loaded: javascriptVideosLoaded },
        ]}
        renderItem={({ item: { title, items, loaded } }) =>
          loaded ? (
            <HorizontalList
              title={title}
              items={items}
              renderItem={(props) => <ListVideoCard {...props} size="small" />}
              keyExtractor={(item) => item.id.videoId}
              style={{ height: 218, marginTop: 18 }}
            />
          ) : (
            <Placeholder style={{ height: 218, width: 300, marginTop: 18 }} />
          )
        }
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
