import { useRouter } from "expo-router";
import { Alert, Text, View } from "react-native";

import Book from "../types/Book";
import StyledButton from "./StyledButton";

interface ViewBookProps {
  book: Book;
  onDelete: Function;
}

export default function ViewBook({ book, onDelete }: ViewBookProps) {
  const router = useRouter();

  return (
    <View
      style={{ borderTopColor: "darkblue", borderTopWidth: 1, marginTop: 12 }}
    >
      <Text>id: {book.id}</Text>
      <Text>Title: {book.title}</Text>
      <Text>Author: {book.author}</Text>
      <Text>Pages: {book.pages}</Text>

      <View style={{ flexDirection: "row" }}>
        <StyledButton
          title="View Book Details"
          onPress={() => {
            if (book.id) {
              router.push(`/home/${book.id}/`);
            } else {
              Alert.alert(
                "View error",
                "cannot access book details because it does not have an id!"
              );
            }
          }}
          style={{ width: "50%" }}
        />

        <StyledButton
          title="Delete"
          onPress={() => {
            if (book.id) {
              Alert.alert("Delete Book", "Are you sure?", [
                {
                  text: "Yes",
                  onPress: async () => {
                    onDelete();
                  },
                },
                {
                  text: "No",
                  style: "cancel",
                },
              ]);
            } else {
              Alert.alert(
                "delete error",
                "cannot delete book because it does not have an id!"
              );
            }
          }}
          style={{ width: "50%", backgroundColor: "darkred" }}
        />
      </View>
    </View>
  );
}
