import { Tabs } from "expo-router";
import HomeIcon from "@/assets/icons/home-icon.svg";
import SearchIcon from "@/assets/icons/search-icon.svg";
import { fontStyles } from "@/constants/FontStyles";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2B2D42",
        tabBarInactiveTintColor: "#FFF",
        tabBarStyle: {
          backgroundColor: "#8D99AE",
          height: 72
        },
        tabBarLabelStyle: fontStyles.poppinsMid,
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
  );
}
