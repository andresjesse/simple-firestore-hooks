import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import HeaderRight from "../../components/HeaderRight";

export default function Home() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Home",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text>Home</Text>
    </View>
  );
}
