import { faker } from "@faker-js/faker";
import { Stack } from "expo-router";
import { Alert, FlatList, Text, View } from "react-native";

import HeaderRight from "../../components/HeaderRight";
import Loading from "../../components/Loading";
import StyledButton from "../../components/StyledButton";
import ViewBook from "../../components/ViewBook";
import useCollection from "../../firebase/hooks/useCollection";
import globalStyles from "../../styles/globalStyles";
import Book from "../../types/Book";

export default function Home() {
  const { data, create, remove, refreshData, loading } =
    useCollection<Book>("books");

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

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ViewBook
              book={item}
              onDelete={async () => {
                await remove(item.id!);
                await refreshData();
              }}
            />
          )}
          style={{ width: "100%" }}
        />
      )}
    </View>
  );
}
