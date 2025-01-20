import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import Video, { VideoRef } from "react-native-video";

export default function VideoPlayer() {
  const { videoUrl } = useLocalSearchParams();
  
  const videoRef = useRef<VideoRef>(null);
  const background = require("@/assets/video/broadchurch.mp4");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Video
        source={background}
        ref={videoRef}
        onBuffer={(ev) => console.log("buffering...", ev.isBuffering)}
        onError={(error) => console.log(error)}
        style={styles.backgroundVideo}
      />
      <Text>Video screen for vid: {videoUrl}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
