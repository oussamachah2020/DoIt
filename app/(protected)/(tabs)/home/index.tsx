import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { fontFamily } from "@constants/typography";
import React from "react";
import { UndoneTasks } from "@components/UndoneTasks";
import { FinishedTasks } from "@components/FinishedTasks";
import { TabView, SceneMap } from "react-native-tab-view";
import { router } from "expo-router";

const FirstRoute = () => <UndoneTasks />;

const SecondRoute = () => <FinishedTasks />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const CustomTabBar = ({
  navigationState,
  navigation,
}: {
  navigationState: any;
  navigation: any;
}) => {
  const { routes } = navigationState;

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
      }}
    >
      {routes.map((route: any, idx: number) => {
        const isRouteActive = idx === navigationState.index;
        return (
          <TouchableOpacity
            key={idx}
            // onPress={() => router.push(route.key)}
            style={{
              flex: 1,
              alignItems: "center",
              paddingVertical: 12,
              borderBottomWidth: isRouteActive ? 4 : 0, // Change borderBottomWidth based on active/inactive state
              borderBottomColor: isRouteActive ? "#2F89FC" : "transparent", // Change borderBottomColor based on active/inactive state
            }}
          >
            <Text
              style={{
                color: isRouteActive ? "#2F89FC" : "black",
                fontFamily: fontFamily.Medium,
              }}
            >
              {route.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function Home() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "In Progress" },
    { key: "second", title: "Finished" },
  ]);

  return (
    <TabView
      style={{
        marginTop: Platform.OS === "android" ? 40 : 50,
      }}
      navigationState={{ index, routes }}
      renderTabBar={CustomTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width, height: layout.height }}
    />
  );
}
