import { Tabs } from "expo-router";
import { Image } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import HomeIcon from "@/assets/icons/home-icon.svg";
import SearchIcon from "@/assets/icons/search-icon.svg";

export default function TabsLayout() {
    return <Tabs
    screenOptions={{
      tabBarActiveTintColor: "#2B2D42",
      headerShown: false,
      tabBarButton: HapticTab,
    //   tabBarBackground: TabBarBackground,
    //   tabBarStyle: Platform.select({
    //     ios: {
    //       // Use a transparent background on iOS to show the blur effect
    //       position: 'absolute',
    //     },
    //     default: {},
    //   }),
    }}>
    <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        tabBarIcon: () => <HomeIcon />,
      }}
    />
    <Tabs.Screen
      name="search"
      options={{
        title: 'Search',
        tabBarIcon: () => <SearchIcon />,
      }}
    />
  </Tabs>
}