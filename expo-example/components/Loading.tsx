import { ActivityIndicator, View } from "react-native";

import globalStyles from "../styles/globalStyles";

export default function Loading() {
  return (
    <View style={globalStyles.container}>
      <ActivityIndicator />
    </View>
  );
}
