import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import globalStyles from "../styles/globalStyles";

export default function Loading() {
  return (
    <View style={globalStyles.container}>
      <ActivityIndicator />
    </View>
  );
}
