import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import StyledButton from "../components/StyledButton";
import useAuth from "../firebase/hooks/useAuth";
import globalStyles from "../styles/globalStyles";
import Loading from "../components/Loading";

export default function _screen() {
  const { login, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("123456");

  if (loading) return <Loading />;

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>
        simple-firestore-hooks expo example
      </Text>
      <Text>Before start: check Readme.md for setup details!</Text>
      <Text>login with email: user@example.com, password: 123456</Text>

      <TextInput
        style={globalStyles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={globalStyles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <StyledButton
        title="Login"
        onPress={async () => {
          try {
            await login(email, password);
            router.push("/home/");
          } catch (error: any) {
            Alert.alert("Login error", error.toString());
          }
        }}
        style={{ marginTop: 12 }}
      />
    </View>
  );
}
