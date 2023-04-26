import { View, Text, Button, Alert } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "expo-router";
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
            router.replace("../");
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
