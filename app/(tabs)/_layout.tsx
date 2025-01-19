import { Tabs } from "expo-router";
import HomeIcon from "@/assets/icons/home-icon.svg";
import SearchIcon from "@/assets/icons/search-icon.svg";
import { fontStyles } from "@/constants/FontStyles";
import { Colors } from "@/constants/Colors";
import { createContext, useEffect, useState } from "react";

export const VideosContext = createContext<AllTopics<VideoResponseData[]>>({
  reactNative: [],
  react: [],
  typescript: [],
  javascript: [],
});

type Topic = "reactNative" | "react" | "typescript" | "javascript";

type AllTopics<T> = {
  [key in Topic]: T;
};

const topics: AllTopics<string> = {
  reactNative: "React Native",
  react: "React",
  typescript: "Typescript",
  javascript: "Javascript",
};

interface VideoResponseData {
  id: {
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
  };
}

export default function TabsLayout() {
  const [videosData, setVideosData] = useState<AllTopics<VideoResponseData[]>>({
    reactNative: [],
    react: [],
    typescript: [],
    javascript: [],
  });

  useEffect(() => {
    async function fetchVideos() {
      const allResults: AllTopics<VideoResponseData[]> = {
        reactNative: [],
        react: [],
        typescript: [],
        javascript: [],
      };
      for (const [key, topic] of Object.entries(topics)) {
        const queryUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.EXPO_PUBLIC_API_KEY}&q=${topic}&type=video`;
        const response = await fetch(queryUrl);
        const json = await response.json();
        allResults[key as keyof AllTopics<any>] = json.items as VideoResponseData[];
      }
      setVideosData(allResults);
    }

    fetchVideos();
  }, []);

  return (
    <VideosContext.Provider value={videosData}>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.light,
        tabBarStyle: {
          backgroundColor: Colors.background,
          height: 72,
        },
        tabBarLabelStyle: fontStyles.poppinsRegular16,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <SearchIcon color={color} />,
        }}
      />
    </Tabs>
    </VideosContext.Provider>
  );
}
