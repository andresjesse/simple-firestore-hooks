import { View, Text, Alert } from "react-native";
import React from "react";
import { Stack, useSearchParams } from "expo-router";
import useDocument from "../../../hooks/useDocument";
import Book from "../../../types/Book";
import HeaderRight from "../../../components/HeaderRight";
import globalStyles from "../../../styles/globalStyles";
import ViewBook from "../../../components/ViewBook";
import StyledButton from "../../../components/StyledButton";
import { faker } from "@faker-js/faker";

export default function BookDetails() {
  const { id } = useSearchParams();

  // for convenience, you can extract data and rename it to "book" by typing data:your_alias_for_data
  const {
    data: book,
    loading,
    upsert,
  } = useDocument<Book>("books", id as string);

  // important: always check for loading state since firestore is async!
  // Also, you can check for existence of book object so your type Book | undefined becomes a Book for sure
  if (loading || !book) return <Text>Loading...</Text>;

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Book",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.title}>Book Details</Text>

      <Text>id: {id}</Text>
      <Text>Title: {book.title}</Text>
      <Text>Author: {book.author}</Text>
      <Text>Pages: {book.pages}</Text>

      <StyledButton
        title="Random Update"
        onPress={async () => {
          try {
            await upsert({
              ...book, // repeating the existing book object
              title: faker.lorem.words(4), // updating title
            });
          } catch (error: any) {
            Alert.alert("Update Book error", error.toString());
          }
        }}
      />
    </View>
  );
}
