import { useRouter } from "expo-router";
import { Alert, Text } from "react-native";

import useAuth from "../firebase/hooks/useAuth";
import StyledButton from "./StyledButton";

export default function HeaderRight() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <>
      <Text>{user?.email}</Text>
      <StyledButton
        onPress={async () => {
          try {
            await logout();
            router.replace("/");
          } catch (error: any) {
            Alert.alert("Logout error", error.toString());
          }
        }}
        title={"Logout"}
        style={{ width: "auto", marginLeft: 12 }}
      />
    </>
  );
}
