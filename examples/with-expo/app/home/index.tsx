import { View, Text, Alert, FlatList } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import HeaderRight from "../../components/HeaderRight";
import globalStyles from "../../styles/globalStyles";
import StyledButton from "../../components/StyledButton";
import useCollection from "../../hooks/useCollection";
import { faker } from "@faker-js/faker";
import Book from "../../types/Book";
import ViewBook from "../../components/ViewBook";

export default function Home() {
  const { data, create, refreshData } = useCollection<Book>("books");

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Home",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.title}>useCollection example</Text>

      <StyledButton
        title="Create book"
        onPress={async () => {
          try {
            await create({
              title: faker.lorem.words(4),
              author: faker.name.fullName(),
              pages: faker.datatype.number({ max: 1000 }),
            });

            await refreshData();
          } catch (error: any) {
            Alert.alert("Create Book error", error.toString());
          }
        }}
      />

      <FlatList
        data={data}
        renderItem={({ item }) => <ViewBook book={item} />}
        style={{ width: "100%" }}
      />
    </View>
  );
}
